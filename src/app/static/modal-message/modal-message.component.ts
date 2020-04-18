import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ServerResponse} from '../../services/user/ServerResponse';
import {ServerCannotConnect} from '../../config/ServerCannotConnect';

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

  public fromNetworkError(): void {
    this.loading = false;
    this.success = false;
    this.message = ServerCannotConnect.MESSAGE;
  }

}
