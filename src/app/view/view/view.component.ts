import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {WikiEntry} from '../../models/WikiEntry';
import {MuseumService} from '../../services/wiki-entry/museum.service';
import {ProtoMuseum} from '../../services/wiki-entry/ProtoMuseum';
import {Museum} from '../../models/Museum';
import {Collection} from '../../models/Collection';
import {CollectionService} from '../../services/wiki-entry/collection.service';
import {ProtoCollection} from '../../services/wiki-entry/ProtoCollection';

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
  contentParents: WikiEntry[];
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
            this.content = Museum.of(response.museum);
            this.contentSubList = response.collectionList;
            this.loading = false;
          },
          error => {
            this.error = true;
            console.log(error);
          });
      } else if (this.viewCategory === 'collection') {
        this.collectionService.getCollection(this.id).subscribe(
          (protoCollection: ProtoCollection) => {
            const collection = ProtoCollection.toCollection(protoCollection);
            this.content = collection;
            this.contentSubList = collection.artifacts;
            this.contentParents = [collection.museum];
            this.loading = false;
          },
          error => {
            this.error = true;
            console.log(error);
          }
        );
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

}
