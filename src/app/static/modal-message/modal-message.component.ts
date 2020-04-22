import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ServerResponse} from '../../services/server-response';
import {ServerCannotConnect} from '../../config/ServerCannotConnect';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.css']
})
export class ModalMessageComponent implements OnInit {

  @Input() title: string;
  @Input() loading: boolean;
  @Input() success: boolean;
  @Input() message: string;

  @Input() modal: NgbActiveModal;

  constructor() {
  }

  ngOnInit(): void {
  }

  public waitingForServerResponse(): void {
    this.loading = true;
    this.message = 'Sending request to server, please wait...';
  }

  public fromServerResponse(res: ServerResponse): void {
    this.loading = false;
    this.success = res.success;
    this.message = res.message;
  }

  public fromNetworkError(err: HttpErrorResponse): void {
    this.loading = false;
    this.success = false;

    if (err.status === 0) {
      this.message = ServerCannotConnect.MESSAGE;
    } else {
      if (err.error && err.error.message) {
        this.message = err.error.message;
      } else {
        this.message = err.message;
      }
    }
  }
}
