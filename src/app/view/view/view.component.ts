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
  contentParent: WikiEntry[];
  contentSubList: WikiEntry[];
  subListName: string;
  private readonly subListNameReference = {museum: 'Collections', collection: 'Artifacts'};

  constructor(private route: ActivatedRoute,
              private router: Router,
              private museumService: MuseumService,
              private collectionService: CollectionService) {
    this.loading = true;
    this.error = false;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.viewCategory = paramMap.get('viewCategory');
      this.id = paramMap.get('id');
      this.subListName = this.subListNameReference[this.viewCategory];
    });

    if (this.viewCategory === 'museum') {
      this.museumService.getMuseum(this.id).then(
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
      this.collectionService.getCollection(this.id).then(
        (protoCollection: ProtoCollection) => {
          const collection = protoCollection.toCollection();
          this.content = collection;
          this.contentSubList = collection.artifacts;
          this.contentParent = [collection.museum];
        },
        error => {
          this.error = true;
          console.log(error);
        }
      );
    }
  }

  goToSubListEntry(entry: WikiEntry): void {
    this.router.navigateByUrl('/view/' + this.subListName.toLowerCase() + '/' + entry.id);
  }

}
