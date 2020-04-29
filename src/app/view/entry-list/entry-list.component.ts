import {Component, Input, OnInit} from '@angular/core';
import {WikiEntry} from '../../models/wiki-entry';
import {Router} from '@angular/router';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  @Input() entryList: WikiEntry[];
  @Input() category: string;

  sortMethod: string;
  sortDict;
  sortOptions = ['name'];
  sortFunctions = [this.sortByName];

  page = 1;
  pageSize = 12;

  constructor(private router: Router) {
    this.sortDict = {};
    for (let i = 0; i < this.sortOptions.length; i++) {
      this.sortDict[this.sortOptions[i]] = this.sortFunctions[i];
    }
  }

  ngOnInit(): void {
    // TODO: use cards to display entry list instead
  }

  goToEntry(entry: WikiEntry): void {
    this.router.navigateByUrl('/view/' + this.category.toLowerCase() + '/' + entry.id);
  }

  sortByName(): void {
    this.entryList.sort((entry1, entry2) => entry1.name.localeCompare(entry2.name));
  }

  sort(): void {
    this.sortDict[this.sortMethod]?.apply();
  }
}
