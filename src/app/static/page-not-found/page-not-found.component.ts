import { Component, OnInit } from '@angular/core';

/**
 * display an error message if a page is not included in the router
 */
@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  /**
   * static page, so no initialization necessary
   */
  ngOnInit(): void {
  }
}
