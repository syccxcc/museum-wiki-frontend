import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {BasicInfo} from '../../models/BasicInfo';
import {MuseumService} from '../../services/museum.service';

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

  content: BasicInfo;

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

    this.categoryToService[this.viewCategory].getWithId(this.id).then(
      (response: BasicInfo) => {
        this.content = response;
        this.loading = false;
      },
      (error => {
        this.error = true;
        console.log(error);
      }));
  }

}
