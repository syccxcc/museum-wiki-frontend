import {Component, Input, OnInit} from '@angular/core';
import {WikiEntry} from '../../../models/wiki-entry';
import {Router} from '@angular/router';
import {faSort} from '@fortawesome/free-solid-svg-icons';
import {faSortUp} from '@fortawesome/free-solid-svg-icons';
import {faSortDown} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-museum-list',
  templateUrl: './user-museum-list.component.html',
  styleUrls: ['./user-museum-list.component.scss']
})
export class UserMuseumListComponent implements OnInit {

  @Input() list: WikiEntry[];

  readonly columnsToDisplay = ['Id', 'Name', 'Actions'];
  readonly columnsToSort = ['Id', 'Name'];
  readonly columnNameToFieldName = {Id: 'id', Name: 'name'};
  columnSortStatus = {};

  sortUntouched = faSort;
  sortUP = faSortUp;
  sortDown = faSortDown;

  constructor(private router: Router) {
    this.resetColumnSortStatus();
  }

  ngOnInit(): void {
  }

  private resetColumnSortStatus() {
    this.columnSortStatus = {};
    for (const column of this.columnsToSort) {
      this.columnSortStatus[column] = this.sortUntouched;
    }
  }

  view(entry: WikiEntry): void {
    this.router.navigateByUrl('/view/museum/' + entry.id);
  }

  delete(entry: WikiEntry): void {
    alert('Not implemented');
    // TODO: implement delete
  }

  sort(column: string): void {
    if (!this.columnSortStatus[column]) {
      return;
    }
    const nextStatus = this.columnSortStatus[column] === this.sortUP ? this.sortDown : this.sortUP;
    this.resetColumnSortStatus();
    this.columnSortStatus[column] = nextStatus;
    const fieldName = this.columnNameToFieldName[column];
    this.list.sort((entry1, entry2) => (nextStatus === this.sortDown !== entry1[fieldName] > entry2[fieldName]) ? 1 : -1);
  }

}
