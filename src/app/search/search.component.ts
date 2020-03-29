import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchCategory: string;

  searchText: string;

  SEARCH_OPTIONS = ['All', 'Museum', 'Collection', 'Artifact'];
  private DEFAULT_SEARCH_CATEGORY = this.SEARCH_OPTIONS[0];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.searchCategory = this.DEFAULT_SEARCH_CATEGORY;
    this.searchText = '';
  }

  public search(): void {
    this.router.navigateByUrl('search/' + this.searchCategory.toLowerCase() + '/' + this.searchText).then();
  }
}
