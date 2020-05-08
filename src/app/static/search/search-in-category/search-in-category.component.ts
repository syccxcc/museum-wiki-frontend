import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {WikiEntry} from '../../../models/wiki-entry';

/**
 * Search for something in a certain category.
 * Currently unused.
 */
@Component({
  selector: 'app-search-in-category',
  templateUrl: './search-in-category.component.html',
  styleUrls: ['./search-in-category.component.css']
})
export class SearchInCategoryComponent implements OnInit {

  /**
   * Category in which the search occurs
   */
  searchCategory;
  /**
   * The text the user inputted
   */
  searchText;

  /**
   * The results of the search
   */
  searchResults: WikiEntry[];

  /**
   * Constructor
   *
   * @param route The current url
   */
  constructor(private route: ActivatedRoute) {
  }

  /**
   * Analyze the url to get search category and text
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.searchCategory = paramMap.get('searchCategory');
      this.searchText = paramMap.get('searchText');
    });
  }

}
