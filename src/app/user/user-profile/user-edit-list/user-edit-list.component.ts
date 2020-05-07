import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Edit} from '../../../models/edit';
import {faSort, faSortDown, faSortUp} from '@fortawesome/free-solid-svg-icons';
import {EditService} from '../../../services/edit.service';
import {ServerResponse} from '../../../services/server-response';
import {HttpErrorResponse} from '@angular/common/http';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalMessageComponent} from '../../../static/modal-message/modal-message.component';
import {Router} from '@angular/router';
import {capitalizeFirstLetter} from '../../../helper/capitalize-first-letter';
import {DatePipe} from '@angular/common';

/**
 * a list of edits related to a user
 *
 * this list can either be a list of edits waiting for the user to review,
 * or simply a list of edits submitted by the user
 */
@Component({
  selector: 'app-user-edit-list',
  templateUrl: './user-edit-list.component.html',
  styleUrls: ['./user-edit-list.component.css']
})
export class UserEditListComponent implements OnInit {

  /**
   * whether the user can take action upon edits in this list
   * true if user is the curator of the museum these edits will affect, false otherwise
   */
  @Input() action: boolean;

  /**
   * list of edits to be displayed in the list
   */
  @Input() editList: Edit[];

  /**
   * emits an event asking the user-profile page to reload user profile because
   * something happened that changed the profile
   */
  @Output() reloadProfile: EventEmitter<any> = new EventEmitter<any>();

  /**
   * columns that are displayed in the table
   */
  readonly columnsToDisplay = ['Type', 'Category', 'Status', 'Date', 'Actions'];
  /**
   * columns in the table that can be sorted
   */
  readonly columnsToSort = ['Type', 'Category', 'Status', 'Date'];
  /**
   * the corresponding field name of a column name
   */
  readonly columnNameToFieldName = {Type: 'type', Category: 'category', Status: 'approvalStatus', Date: 'date'};

  /**
   * a function that capitalizes the first letter of a string
   */
  readonly capitalizeFirstLetter = capitalizeFirstLetter;

  /**
   * store the sort status of all columns (untouched, sort ascending, sort descending)
   */
  columnSortStatus = {};

  // font awesome sort icons
  sortUntouched = faSort;
  sortUP = faSortUp;
  sortDown = faSortDown;

  constructor(private editService: EditService,
              private modalService: NgbModal,
              private router: Router) {
  }

  /**
   * reset the sorting status of all columns to untouched
   */
  private resetColumnSortStatus() {
    this.columnSortStatus = {};
    for (const column of this.columnsToSort) {
      this.columnSortStatus[column] = this.sortUntouched;
    }
  }

  ngOnInit(): void {
    this.resetColumnSortStatus();
    // by default, sort by descending order in status so that
    // the edits that are "Under review" come first
    this.sort('Date');
    this.sort('Date');
  }

  /**
   * sort a certain column
   * if that column is untouched or sorting down, sort up, otherwise, sort down
   * @param column the name of the colume whose sort status will be changed
   */
  sort(column: string): void {
    // check if this column can be sorted
    if (!this.columnSortStatus[column]) {
      return;
    }
    // the next sort status of the current column
    const nextStatus = this.columnSortStatus[column] === this.sortUP ? this.sortDown : this.sortUP;
    this.resetColumnSortStatus();
    this.columnSortStatus[column] = nextStatus;

    // name of the field that will be compared
    const fieldName = this.columnNameToFieldName[column];

    // sort list of edits
    this.editList.sort(
      (entry1, entry2) =>
        // compare the two entries, if trying to sort down, the comparison result will be inverted
        // the !== operator is equivalent to a ^ binary operator
        (nextStatus === this.sortDown !== entry1[fieldName] > entry2[fieldName]) ? 1 : -1);
  }

  /**
   * deny an edit
   * @param entry the edit to be denied
   */
  deny(entry: Edit): void {
    this.reviewEdit(entry, false);
  }

  /**
   * approve an edit
   * @param entry the edit to be approved
   */
  approve(entry: Edit): void {
    this.reviewEdit(entry, true);
  }

  /**
   * publish the review of an edit
   *
   * @param entry the edit that is reviewed
   * @param action the review action to take
   * true for approve, false for deny
   */
  reviewEdit(entry: Edit, action: boolean): void {
    // open a new modal to display the result of review
    const modal = this.modalService.open(ModalMessageComponent);
    const modalComponent: ModalMessageComponent = modal.componentInstance;
    modalComponent.title = 'Review Edit';
    modalComponent.modal = modal;
    modalComponent.waitingForServerResponse();
    this.editService.reviewEdit(entry, action).then(
      (res: ServerResponse) => {
        modalComponent.fromServerResponse(res);
        // let user-profile page retrieve data again
        this.reloadProfile.emit();
      },
      (err: HttpErrorResponse) => {
        modalComponent.fromNetworkError(err);
      }
    );
  }

  view(entry: Edit): void {
    this.router.navigateByUrl('/view-edit/' + entry.id);
  }
}
