import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {BasicInfo} from '../../models/BasicInfo';
import {MuseumService} from '../../services/museum.service';
import {Museum} from '../../models/Museum';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  viewCategory: string;
  id: string;

  content: BasicInfo;

  constructor(private route: ActivatedRoute,
              private museumService: MuseumService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.viewCategory = paramMap.get('viewCategory');
      this.id = paramMap.get('id');
    });
    this.museumService.getMuseum(this.id).then(
      (res: BasicInfo) => {
        this.content = res;
      }
    );
  }

}
