import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  @Input() waiting: boolean;
  @Input() error: boolean;

  constructor() {
    this.waiting = false;
    this.error = false;
  }

  ngOnInit(): void {
  }

}
