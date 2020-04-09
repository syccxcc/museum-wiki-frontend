import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnChanges {

  searchCategory: string;

  searchText: string;

  SEARCH_OPTIONS = ['all', 'museum', 'collection', 'artifact'];
  private DEFAULT_SEARCH_CATEGORY = this.SEARCH_OPTIONS[0];

  @Input() previousCategory: string;
  @Input() previousText: string;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.setToInput();
  }

  setToInput(): void {
    this.searchCategory = this.previousCategory ? this.previousCategory : this.DEFAULT_SEARCH_CATEGORY;
    this.searchText = this.previousText ? this.previousText : '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setToInput();
  }

  public search(): void {
    this.router.navigateByUrl('search/' + this.searchCategory + '/' + this.searchText).then();
  }


}
