import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {WikiEntry} from '../../models/wiki-entry';
import {MuseumService} from '../../services/wiki-entry/museum.service';
import {ProtoMuseum} from '../../services/object-prototypes/proto-museum';
import {Museum} from '../../models/museum';
import {Collection} from '../../models/collection';
import {CollectionService} from '../../services/wiki-entry/collection.service';
import {ProtoCollection} from '../../services/object-prototypes/proto-collection';
import {BasicEntry} from '../../models/basic-entry';
import {Artifact} from '../../models/artifact';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  viewCategory: string;
  id: string;

  loading: boolean;
  error: boolean;

  content: WikiEntry;
  museum: Museum;
  collection: Collection;
  artifact: Artifact;
  contentParents: BasicEntry[];
  parentName: string;
  contentSubList: WikiEntry[];
  subListName: string;
  private readonly subListNameReference = {museum: 'Collection', collection: 'Artifact'};
  private readonly parentNameReference = {collection: 'museum', artifact: 'collection'};

  private resetLoadingStatus(): void {
    this.loading = true;
    this.error = false;
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private museumService: MuseumService,
              private collectionService: CollectionService) {
    this.resetLoadingStatus();

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.viewCategory = paramMap.get('viewCategory');
      this.id = paramMap.get('id');
      this.resetLoadingStatus();
      this.subListName = this.subListNameReference[this.viewCategory];
      this.parentName = this.parentNameReference[this.viewCategory];

      if (this.viewCategory === 'museum') {
        this.museumService.getMuseum(this.id).subscribe(
          (response: ProtoMuseum) => {
            this.museum = Museum.of(response.museum);
            this.content = this.museum;
            this.contentSubList = response.collectionList;
            this.loading = false;
          },
          (error: HttpErrorResponse) => {
            this.error = true;
            console.log(error);
          });
      } else if (this.viewCategory === 'collection') {
        this.collectionService.getCollection(this.id).subscribe(
          (protoCollection: ProtoCollection) => {
            const collection = ProtoCollection.toCollection(protoCollection);
            this.content = collection;
            this.collection = collection;
            this.contentSubList = collection.artifacts;
            this.contentParents = [collection.museum];
            this.loading = false;
          },
          (error: HttpErrorResponse) => {
            this.error = true;
            console.log(error);
          }
        );
      } else if (this.viewCategory === 'artifact') {
        // TODO: add artifact behavior
      }
    });
  }

  ngOnInit(): void {
  }

  goToSubListEntry(entry: WikiEntry): void {
    this.router.navigateByUrl('/view/' + this.subListName.toLowerCase() + '/' + entry.id);
  }

  goToParent(entry: WikiEntry): void {
    this.router.navigateByUrl('/view/' + this.parentName + '/' + entry.id);
  }

  createSubItem(): void {
    let url = '/create/' + this.subListName.toLowerCase() + '/';
    if (this.viewCategory === 'collection') {
      url = url.concat(this.collection.museum.id);
    } else if (this.viewCategory === 'artifact') {
      url = url.concat(this.artifact.museum.id);
    }
    this.router.navigateByUrl(url);
  }

}
