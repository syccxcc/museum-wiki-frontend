import {Component, Input, OnInit} from '@angular/core';
import {ServerCannotConnect} from '../../config/ServerCannotConnect';

/**
 * displays the loading status of the web page
 * if the app is loading data or has encountered an error, display a message
 * if the app has successfully finished loading, display nothing
 */
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  /**
   * whether the frontend is waiting for a backend to respond
   */
  @Input() loading: boolean;
  /**
   * whether the frontend experienced an error while trying to retrieve data
   */
  @Input() error: boolean;

  /**
   * the message for loading data
   */
  readonly loadingMessage = 'Loading, please wait...';
  /**
   * the message for a server connection error
   */
  readonly errorMessage = ServerCannotConnect.MESSAGE;

  /**
   * default to not loading and no errors
   */
  constructor() {
    this.loading = false;
    this.error = false;
  }

  /**
   * do nothing since input binding takes care of changes in loading status
   */
  ngOnInit(): void {
  }

}
