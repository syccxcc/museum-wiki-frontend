import {Component, OnInit} from '@angular/core';
import {UserInfoService} from '../../services/user-info.service';
import {BasicUserInfo} from '../../models/BasicUserInfo';
import {ServerResponse} from '../../services/user/ServerResponse';
import {Router} from '@angular/router';
import {PreviousRouteService} from '../../services/previous-route.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  tryingToLogin: boolean;
  loginMessage: string;

  constructor(private router: Router,
              private previousRoute: PreviousRouteService,
              private userInfoService: UserInfoService) {
    if (userInfoService.isLoggedIn) {
      router.navigateByUrl('/user-profile');
    }

    this.tryingToLogin = false;
    this.loginMessage = '';
    this.username = '';
    this.password = '';
  }

  ngOnInit(): void {
  }

  public login(): void {
    const REDIRECT_WAIT_TIME = 500;

    this.tryingToLogin = true;
    const userInfo = new BasicUserInfo(this.username, this.password);
    this.loginMessage = 'Sending request to server...';
    this.userInfoService.login(userInfo).then(
      (response: ServerResponse) => {
        if (response.success) {
          if (this.previousRoute.previousRoute != null) {
            this.loginMessage = 'Login successful! Redirecting to previous page...';
            setTimeout(() => {
              this.router.navigateByUrl(this.previousRoute.previousRoute.url.join());
            }, REDIRECT_WAIT_TIME);
          } else {
            this.loginMessage = 'Login successful! Redirecting to home page...';
            setTimeout(() => {
              this.router.navigateByUrl('/home');
            }, REDIRECT_WAIT_TIME);
          }
        } else {
          this.loginMessage = response.message;
        }
      },
      (error) => {
        console.log(error);
        this.loginMessage =
          'An error occurred and login request cannot be processed. ' +
          'Either you are not connected to the internet or the server is down. ' +
          'Check browser console for details.';
      }
    );
  }

  public fakeLogin(): void {
    // FIXME: remove this when testing is done
    this.userInfoService.isLoggedIn = true;
    this.userInfoService.basicUserInfo = new BasicUserInfo('Test User', '123456');
  }

  public register(): void {
    this.router.navigateByUrl('/register');
  }

}
