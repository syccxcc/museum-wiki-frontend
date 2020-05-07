import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from '@angular/common/http';
import {LoginService} from '../../services/user/login.service';
import {ServerResponse} from '../../services/server-response';
import {Wrapper} from '../../models/Wrapper';

/**
 * a modal prompting for the user to enter his/her username
 * for password reset
 */
@Component({
  selector: 'app-reset-password-modal',
  templateUrl: './reset-password-modal.component.html',
  styleUrls: ['./reset-password-modal.component.css']
})
export class ResetPasswordModalComponent implements OnInit {
  /**
   * modal object that displays this component
   */
  modal: NgbActiveModal;
  /**
   * the username typed by the user
   */
  username: string;

  /**
   * constructor
   *
   * @param loginService provides api for password reset
   */
  constructor(private loginService: LoginService) {
  }

  /**
   * method does not need any initialization
   */
  ngOnInit(): void {
  }

  /**
   * submit the typed username
   */
  submit() {
    this.modal.close(new Wrapper<Promise<ServerResponse>>(this.loginService.resetPassword(this.username)));
  }

  /**
   * triggered if user clicks the close button
   */
  close() {
    this.modal.dismiss('User clicked close button');
  }
}
