import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/user/login.service';
import {User} from '../../models/User';
import {UserInfoService} from '../../services/user/user-info.service';
import {ServerResponse} from '../../services/user/ServerResponse';
import {Router} from '@angular/router';
import {PreviousRouteService} from '../../services/previous-route.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalMessageComponent} from '../../static/modal-message/modal-message.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  username: string;
  password: string;
  retypePassword: string;
  email: string;

  constructor(private router: Router,
              private loginService: LoginService,
              private userInfoService: UserInfoService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  register(): void {
    // TODO: switch to reactive forms and add form validation
    const newUser: User = new User(this.username, this.email, this.password);

    const modal = this.modalService.open(ModalMessageComponent);
    const modalComponent = modal.componentInstance;
    modalComponent.title = 'Registration';
    modalComponent.modal = modal;
    modalComponent.waitingForServerResponse();

    this
      .loginService
      .register(newUser)
      .then(
        (res: ServerResponse) => {
          modalComponent.fromServerResponse(res);
          if (res.success) {
            modalComponent.message += '\nRedirecting to login page in 3 seconds.';
            setTimeout(() => {
              modal.close();
              this.router.navigateByUrl('/login');
            }, 3000);
          }
        },
        (error) => {
          modalComponent.fromNetworkError(error);
          console.log(error);
        }
      );
  }
}
