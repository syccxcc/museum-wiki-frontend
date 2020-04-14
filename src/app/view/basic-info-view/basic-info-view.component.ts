import {Component, Input, OnInit} from '@angular/core';
import {BasicInfo} from '../../models/BasicInfo';

@Component({
  selector: 'app-basic-info-view',
  templateUrl: './basic-info-view.component.html',
  styleUrls: ['./basic-info-view.component.css']
})
export class BasicInfoViewComponent implements OnInit {

  @Input() basicInfo: BasicInfo;

  constructor() {
  }

  ngOnInit(): void {
  }

}
