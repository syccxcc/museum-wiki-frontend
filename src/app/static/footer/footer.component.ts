import {Component, OnInit} from '@angular/core';

/**
 * the footer of the web page
 * it displays the team name and its members
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  /**
   * do nothing on instantiation since page is static
   */
  constructor() {
  }

}
