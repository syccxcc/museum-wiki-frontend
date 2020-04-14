import {Component, OnInit} from '@angular/core';
import {UserInfoService} from '../../services/user-info.service';
import {BasicUserInfo} from '../../models/BasicUserInfo';
import {ServerResponse} from '../../services/user/ServerResponse';
import {Router} from '@angular/router';
import {PreviousRouteService} from '../../services/previous-route.service';

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
    this.tryingToLogin = false;
    this.loginMessage = '';
  }

  ngOnInit(): void {
    // TODO: create login page
  }

  public login(): void {
    this.tryingToLogin = true;
    const userInfo = new BasicUserInfo(this.username, this.password);
    this.loginMessage = 'Trying to login...';
    this.userInfoService.login(userInfo).then(
      (response: ServerResponse) => {
        if (response.success) {
          if (this.previousRoute.previousRoute != null) {
            this.router.navigateByUrl(this.previousRoute.previousRoute.url.join());
          } else {
            this.router.navigateByUrl('/home');
          }
        }
      }
    );
  }

  public fakeLogin(): void {
    // FIXME: remove this when testing is done
    this.userInfoService.isLoggedIn = true;
    this.userInfoService.basicUserInfo = new BasicUserInfo('Test User', '123456');
  }

}
