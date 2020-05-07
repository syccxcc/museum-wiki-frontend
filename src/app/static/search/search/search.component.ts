import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';

/**
 * allows searching for something in the entire database, currently unused
 */
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  /**
   * the category in which the search is conducted
   */
  searchCategory: string;

  /**
   * the user inputted search text
   */
  searchText: string;

  /**
   * the options the user have for a search
   */
  SEARCH_OPTIONS = ['all', 'museum', 'collection', 'artifact'];

  private DEFAULT_SEARCH_CATEGORY = this.SEARCH_OPTIONS[0];

  /**
   * if there's a previously selected category, default to this one instead
   */
  @Input() previousCategory: string;
  /**
   * if the user previously searched for a text, default to this instead
   */
  @Input() previousText: string;

  /**
   * constructor
   *
   * @param router routes to the search results page
   */
  constructor(private router: Router) {
  }

  /**
   * initialize search fields
   */
  ngOnInit(): void {
    this.setToInput();
  }

  /**
   * if there's a previous search, populate input boxes with previous search
   * otherwise, initialize everything to the default value
   */
  setToInput(): void {
    this.searchCategory = this.previousCategory ? this.previousCategory : this.DEFAULT_SEARCH_CATEGORY;
    this.searchText = this.previousText ? this.previousText : '';
  }

  /**
   * navigate to search results url to perform a search
   */
  public search(): void {
    this.router.navigateByUrl('search/' + this.searchCategory + '/' + this.searchText).then();
  }


}
