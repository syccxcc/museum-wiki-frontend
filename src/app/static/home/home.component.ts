import { Component, OnInit } from '@angular/core';
import {NavigationBarComponent} from '../navigation-bar/navigation-bar.component';

/**
 * the home page of the application
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /**
   * do nothing on initialization since page is static
   * it's subcomponents will take care of fetching museum list from the server
   */
  ngOnInit(): void {
  }

}
