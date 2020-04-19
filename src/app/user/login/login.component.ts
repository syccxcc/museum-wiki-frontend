import {Component, OnInit} from '@angular/core';
import {UserInfoService} from '../../services/user/user-info.service';
import {BasicUserInfo} from '../../models/BasicUserInfo';
import {ServerResponse} from '../../services/user/ServerResponse';
import {Router} from '@angular/router';
import {PreviousRouteService} from '../../services/previous-route.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalMessageComponent} from '../../static/modal-message/modal-message.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;


  constructor(private router: Router,
              private previousRoute: PreviousRouteService,
              private userInfoService: UserInfoService,
              private modalService: NgbModal) {

    if (userInfoService.isLoggedIn) {
      router.navigateByUrl('/user-profile');
    }

    this.username = '';
    this.password = '';
  }

  ngOnInit(): void {
  }

  public login(): void {
    const REDIRECT_WAIT_TIME = 3000;

    const userInfo = new BasicUserInfo(this.username, this.password);
    const modal = this.modalService.open(ModalMessageComponent);
    const modalComponent = modal.componentInstance;
    modalComponent.title = 'Trying to Login';
    modalComponent.modal = modal;
    modalComponent.waitingForServerResponse();
    this.userInfoService.login(userInfo).then(
      (response: ServerResponse) => {
        modalComponent.fromServerResponse(response);
        if (response.success) {
          if (this.previousRoute.previousRoute != null) {
            modalComponent.message += '\nRedirecting to previous page...';
            setTimeout(() => {
              modal.close();
              this.router.navigateByUrl(this.previousRoute.previousRoute.url.join());
            }, REDIRECT_WAIT_TIME);
          } else {
            modalComponent.message += '\nRedirecting to home page...';
            setTimeout(() => {
              modal.close();
              this.router.navigateByUrl('/home');
            }, REDIRECT_WAIT_TIME);
          }
        }
      },
      (error) => {
        modalComponent.fromNetworkError(error);
        console.log(error);
      }
    );
  }

  public fakeLogin(): void {
    // FIXME: remove this when testing is done
    this.userInfoService.isLoggedIn = true;
    this.userInfoService.basicUserInfo = new BasicUserInfo('Test User', '123456');
    this.userInfoService.loginEvent.next(true);
  }

  public register(): void {
    this.router.navigateByUrl('/register');
  }

}
