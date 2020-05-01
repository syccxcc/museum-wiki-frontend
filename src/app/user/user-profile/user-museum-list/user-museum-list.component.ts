import {Component, Input, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-user-museum-list',
  templateUrl: './user-museum-list.component.html',
  styleUrls: ['./user-museum-list.component.scss']
})
export class UserMuseumListComponent implements OnInit {

  @Input() list: WikiEntry[];

  readonly columnsToDisplay = ['Name', 'Actions'];
  readonly columnsToSort = ['Name'];
  readonly columnNameToFieldName = {Name: 'name'};
  columnSortStatus = {};

  sortUntouched = faSort;
  sortUP = faSortUp;
  sortDown = faSortDown;

  constructor(private router: Router,
              private museumService: MuseumService,
              private modalService: NgbModal) {
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
    // TODO: add confirmation modal
    const modal = this.modalService.open(ModalMessageComponent);
    const modalComponent: ModalMessageComponent = modal.componentInstance;
    modalComponent.modal = modal;
    modalComponent.title = 'Delete ' + entry.name;
    modalComponent.waitingForServerResponse();
    this.museumService.deleteMuseum(entry.id).then(
      (res: ServerResponse) => {
        modalComponent.fromServerResponse(res);
      },
      (err: HttpErrorResponse) => {
        modalComponent.fromNetworkError(err);
      }
    );
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
