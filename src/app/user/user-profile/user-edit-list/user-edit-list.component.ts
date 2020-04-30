import {Component, Input, OnInit} from '@angular/core';
import {Edit} from '../../../models/edit';
import {faSort, faSortDown, faSortUp} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-edit-list',
  templateUrl: './user-edit-list.component.html',
  styleUrls: ['./user-edit-list.component.css']
})
export class UserEditListComponent implements OnInit {

  @Input() action: boolean;
  @Input() editList: Edit[];
  readonly columnsToDisplay = ['Id', 'Type', 'Category', 'Status', 'Actions'];
  readonly columnsToSort = ['Id', 'Type', 'Category', 'Status'];
  readonly columnNameToFieldName = {Id: 'id', Type: 'type', Category: 'category', Status: 'approvalStatus'};
  columnSortStatus = {};

  sortUntouched = faSort;
  sortUP = faSortUp;
  sortDown = faSortDown;

  constructor() {
  }

  private resetColumnSortStatus() {
    this.columnSortStatus = {};
    for (const column of this.columnsToSort) {
      this.columnSortStatus[column] = this.sortUntouched;
    }
  }

  ngOnInit(): void {
    this.resetColumnSortStatus();
  }

  sort(column: string): void {
    if (!this.columnSortStatus[column]) {
      return;
    }
    const nextStatus = this.columnSortStatus[column] === this.sortUP ? this.sortDown : this.sortUP;
    this.resetColumnSortStatus();
    this.columnSortStatus[column] = nextStatus;
    const fieldName = this.columnNameToFieldName[column];
    this.editList.sort((entry1, entry2) => (nextStatus === this.sortDown !== entry1[fieldName] > entry2[fieldName]) ? 1 : -1);
  }

  deny(entry: Edit): void {
    // TODO: deny
  }

  approve(entry: Edit): void {
    // TODO: approve
  }

  view(entry: Edit): void {
    // TODO: view
  }
}
