import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from '@angular/common/http';
import {LoginService} from '../../services/user/login.service';
import {ServerResponse} from '../../services/server-response';
import {Wrapper} from '../../models/Wrapper';

@Component({
  selector: 'app-reset-password-modal',
  templateUrl: './reset-password-modal.component.html',
  styleUrls: ['./reset-password-modal.component.css']
})
export class ResetPasswordModalComponent implements OnInit {
  modal: NgbActiveModal;
  username: string;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  submit() {
    this.modal.close(new Wrapper(this.loginService.resetPassword(this.username)));
  }

  close() {
    this.modal.dismiss();
  }
}
