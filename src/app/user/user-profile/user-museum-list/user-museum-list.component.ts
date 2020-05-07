import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WikiEntry} from '../../../models/wiki-entry';
import {Router} from '@angular/router';
import {faSort} from '@fortawesome/free-solid-svg-icons';
import {faSortUp} from '@fortawesome/free-solid-svg-icons';
import {faSortDown} from '@fortawesome/free-solid-svg-icons';
import {MuseumService} from '../../../services/wiki-entry/museum.service';
import {ServerResponse} from '../../../services/server-response';
import {HttpErrorResponse} from '@angular/common/http';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalMessageComponent} from '../../../static/modal-message/modal-message.component';
import {ConfirmationModalComponent} from '../../../static/confirmation-modal/confirmation-modal.component';

/**
 * a list of user-owned in the user profile page
 */
@Component({
  selector: 'app-user-museum-list',
  templateUrl: './user-museum-list.component.html',
  styleUrls: ['./user-museum-list.component.scss']
})
export class UserMuseumListComponent implements OnInit {

  /**
   * an array of museums to be shown
   */
  @Input() list: WikiEntry[];
  /**
   * whether this list is a special museum list for the head curator
   */
  @Input() headCuratorList: boolean;
  /**
   * emits an event whenever a change happened to the user profile page
   * so that user profile can reload
   */
  @Output() reloadProfile = new EventEmitter<any>();

  /**
   * columns that are displayed in the table
   */
  readonly columnsToDisplay = ['Name', 'Actions'];
  /**
   * columns in the table that can be sorted
   */
  readonly columnsToSort = ['Name'];
  /**
   * the corresponding field name of a column name
   */
  readonly columnNameToFieldName = {Name: 'name'};

  /**
   * store the sort status of all columns (untouched, sort ascending, sort descending)
   */
  columnSortStatus = {};

  /**
   * font awesome sort icon
   */
  sortUntouched = faSort;
  /**
   * font awesome sort icon with only one arrow pointing up
   */
  sortUP = faSortUp;
  /**
   * font awesome sort icon with only one arrow pointing down
   */
  sortDown = faSortDown;

  /**
   * constructor
   *
   * @param router routes to detailed museum info
   * @param museumService facilitate museum deletion
   * @param modalService open modal for confirmation & user feedback
   */
  constructor(private router: Router,
              private museumService: MuseumService,
              private modalService: NgbModal) {
    this.resetColumnSortStatus();
  }

  /**
   * do nothing on initialization since all data are passed through input binding
   */
  ngOnInit(): void {
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

  /**
   * look at the details of a museum
   *
   * @param entry the desired museum entry
   */
  view(entry: WikiEntry): void {
    this.router.navigateByUrl('/view/museum/' + entry.id);
  }

  /**
   * delete a museum
   *
   * @param entry the museum to be deleted
   */
  delete(entry: WikiEntry): void {
    // let the user confirm that the museum should be deleted
    const confirmModal = this.modalService.open(ConfirmationModalComponent);
    const confirmationModalComponent: ConfirmationModalComponent = confirmModal.componentInstance;
    confirmationModalComponent.title = 'Delete Museum';
    confirmationModalComponent.message = 'Are you sure?';
    confirmationModalComponent.modal = confirmModal;
    confirmModal.result.then(
      /**
       * act based on the user response in confirmation modal
       *
       * @param dismissReason true if user clicked yes, false otherwise
       */
      (dismissReason: boolean) => {
        // if user chose no, don't do anything
        if (!dismissReason) {
          return;
        }
        // open a modal and display the result of deletion attempt
        const modal = this.modalService.open(ModalMessageComponent);
        const modalComponent: ModalMessageComponent = modal.componentInstance;
        modalComponent.modal = modal;
        modalComponent.title = 'Delete ' + entry.name;
        modalComponent.waitingForServerResponse();
        this.museumService.deleteMuseum(entry.id).then(
          (res: ServerResponse) => {
            modalComponent.fromServerResponse(res);
            // reload the user profile after this change
            this.reloadProfile.emit();
          },
          (err: HttpErrorResponse) => {
            modalComponent.fromNetworkError(err);
          }
        );
      }
    );
  }

  /**
   * sort a certain column
   * if that column is untouched or sorting down, sort up, otherwise, sort down
   *
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

    this.list.sort(
      (entry1, entry2) =>
        // compare the two entries, if trying to sort down, the comparison result will be inverted
        // the !== operator is equivalent to a ^ binary operator
        (nextStatus === this.sortDown !== entry1[fieldName] > entry2[fieldName]) ? 1 : -1);
  }

}
