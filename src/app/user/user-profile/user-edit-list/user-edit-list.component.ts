import {Component, Input, OnInit} from '@angular/core';
import {Edit} from '../../../models/edit';
import {faSort, faSortDown, faSortUp} from '@fortawesome/free-solid-svg-icons';
import {EditService} from '../../../services/edit.service';
import {ServerResponse} from '../../../services/server-response';
import {HttpErrorResponse} from '@angular/common/http';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalMessageComponent} from '../../../static/modal-message/modal-message.component';

@Component({
  selector: 'app-user-edit-list',
  templateUrl: './user-edit-list.component.html',
  styleUrls: ['./user-edit-list.component.css']
})
export class UserEditListComponent implements OnInit {

  @Input() action: boolean;
  @Input() editList: Edit[];
  readonly columnsToDisplay = ['Type', 'Category', 'Status', 'Actions'];
  readonly columnsToSort = ['Type', 'Category', 'Status'];
  readonly columnNameToFieldName = {Type: 'type', Category: 'category', Status: 'approvalStatus'};
  columnSortStatus = {};

  sortUntouched = faSort;
  sortUP = faSortUp;
  sortDown = faSortDown;

  constructor(private editService: EditService,
              private modalService: NgbModal) {
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
    this.reviewEdit(entry, false);
  }

  approve(entry: Edit): void {
    this.reviewEdit(entry, true);
  }

  reviewEdit(entry: Edit, action: boolean): void {
    const modal = this.modalService.open(ModalMessageComponent);
    const modalComponent: ModalMessageComponent = modal.componentInstance;
    modalComponent.title = 'Review Edit';
    modalComponent.modal = modal;
    modalComponent.waitingForServerResponse();
    this.editService.reviewEdit(entry.id, true).then(
      (res: ServerResponse) => {
        modalComponent.fromServerResponse(res);
      },
      (err: HttpErrorResponse) => {
        modalComponent.fromNetworkError(err);
      }
    );
  }

  view(entry: Edit): void {
    // TODO: view
  }
}
