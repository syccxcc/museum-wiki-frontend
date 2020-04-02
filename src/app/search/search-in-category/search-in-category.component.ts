import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {SearchResult} from '../SearchResult';

@Component({
  selector: 'app-search-in-category',
  templateUrl: './search-in-category.component.html',
  styleUrls: ['./search-in-category.component.css']
})
export class SearchInCategoryComponent implements OnInit {

  searchCategory;
  searchText;

  searchResults: SearchResult[];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.searchCategory = paramMap.get('searchCategory');
      this.searchText = paramMap.get('searchText');
    });
  }

}
