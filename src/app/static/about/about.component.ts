import { Component, OnInit } from '@angular/core';
import {NavigationBarComponent} from '../navigation-bar/navigation-bar.component';

/**
 * detailed information about museum wiki, currently not used
 */
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  /**
   * do nothing on initialization since page is static
   */
  ngOnInit(): void {
  }

}
