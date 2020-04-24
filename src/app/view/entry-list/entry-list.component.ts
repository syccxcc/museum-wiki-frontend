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

  page = 1;
  pageSize = 10;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToEntry(entry: WikiEntry): void {
    this.router.navigateByUrl('/view/' + this.category.toLowerCase() + '/' + entry.id);
  }

  sortByName(): void {
    this.entryList.sort((entry1, entry2) => entry1.name > entry2.name ? 1 : -1);
  }
}
