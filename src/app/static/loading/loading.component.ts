import {Component, Input, OnInit} from '@angular/core';
import {ServerCannotConnect} from '../../config/ServerCannotConnect';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  @Input() loading: boolean;
  @Input() error: boolean;

  errorMessage = ServerCannotConnect.MESSAGE;

  constructor() {
    this.loading = false;
    this.error = false;
  }

  ngOnInit(): void {
  }

}
