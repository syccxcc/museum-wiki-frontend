import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {WikiEntry} from '../../models/WikiEntry';
import {MuseumService} from '../../services/wiki-entry/museum.service';
import {ProtoMuseum} from '../../services/wiki-entry/ProtoMuseum';
import {Museum} from '../../models/Museum';
import {Collection} from '../../models/Collection';

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
  artifact: any;

  categoryToService;

  constructor(private route: ActivatedRoute,
              private museumService: MuseumService) {
    this.categoryToService = {museum: museumService};

    this.loading = true;
    this.error = false;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.viewCategory = paramMap.get('viewCategory');
      this.id = paramMap.get('id');
    });

    this.museumService.getMuseum(this.id).then(
      (response: ProtoMuseum) => {
        this.museum = Museum.of(response.museum);
        this.content = this.museum;
        this.museum.collections = response.collectionList;
        this.loading = false;
      },
      (error => {
        this.error = true;
        console.log(error);
      }));
  }

}
