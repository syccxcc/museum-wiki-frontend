import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {WikiEntry} from '../../../models/wiki-entry';

@Component({
  selector: 'app-search-in-category',
  templateUrl: './search-in-category.component.html',
  styleUrls: ['./search-in-category.component.css']
})
export class SearchInCategoryComponent implements OnInit {

  searchCategory;
  searchText;

  searchResults: WikiEntry[];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.searchCategory = paramMap.get('searchCategory');
      this.searchText = paramMap.get('searchText');
    });
  }

}
