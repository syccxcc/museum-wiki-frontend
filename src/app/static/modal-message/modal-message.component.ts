import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ServerResponse} from '../../services/server-response';
import {ServerCannotConnect} from '../../config/ServerCannotConnect';
import {HttpErrorResponse} from '@angular/common/http';
import {faCheckCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons';

/**
 * a modal that displays a message
 */
@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.css']
})
export class ModalMessageComponent implements OnInit {

  /**
   * title of modal
   */
  @Input() title: string;
  /**
   * whether the app is waiting for a response from a backend server
   */
  @Input() loading: boolean;
  /**
   * whether the user request is successful
   */
  @Input() success: boolean;
  /**
   * the message to display for the user
   */
  @Input() message: string;

  /**
   * the modal object that contains this component
   */
  @Input() modal: NgbActiveModal;

  /**
   * a circle containing a checkmark, representing success
   */
  faCheckCircle = faCheckCircle;
  /**
   * a circle containing a multiplication sign, representing failure
   */
  faTimesCircle = faTimesCircle;

  /**
   * everything is passed through direct public field manipulation
   * so no need to initialize anything
   */
  ngOnInit(): void {
  }

  /**
   * adjust the modal to reflect that the app is waiting for a response from the server
   */
  public waitingForServerResponse(): void {
    this.loading = true;
    this.message = 'Sending request to server, please wait...';
  }

  /**
   * let modal reflect the result from the server
   *
   * @param res response from the server
   */
  public fromServerResponse(res: ServerResponse): void {
    this.loading = false;
    this.success = res.success;
    this.message = res.message;
  }

  /**
   * let modal reflect the error the app encounters
   *
   * @param err the error returned by a Promise/Observable
   */
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
