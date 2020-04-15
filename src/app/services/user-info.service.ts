import {Injectable} from '@angular/core';
import {BasicUserInfo} from '../models/BasicUserInfo';
import {LoginService} from './login.service';
import {CookieService} from 'ngx-cookie-service';
import {ServerResponse} from './user/ServerResponse';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  isLoggedIn: boolean;
  basicUserInfo: BasicUserInfo;

  constructor(private loginService: LoginService,
              private cookieService: CookieService) {
    this.isLoggedIn = false;
    this.basicUserInfo = null;

    if (cookieService.check('username') && cookieService.check('password')) {
      this
        .login(new BasicUserInfo(cookieService.get('username'), cookieService.get('password')))
        .then((res: ServerResponse) => {
          if (!res.success) {
            cookieService.delete('username');
            cookieService.delete('password');
          }
        });
    }
  }

  public getBasicUserInfo(): BasicUserInfo {
    return this.isLoggedIn ? this.basicUserInfo : null;
  }

  public login(loginCredentials: BasicUserInfo): Promise<ServerResponse> {
    const loginPromise: Promise<ServerResponse> = this.loginService.login(loginCredentials);
    loginPromise.then((res: ServerResponse) => {
        if (res.success) {
          this.isLoggedIn = true;
          this.basicUserInfo = loginCredentials;

          this.cookieService.set('username', loginCredentials.username);
          this.cookieService.set('password', loginCredentials.password);
        } else {
          this.isLoggedIn = false;
        }
      },
      (error) => {
        console.log(error);
      });
    return loginPromise;
  }

  public getCompleteUserInfo(): Promise<User> {
    return this.loginService.getCompleteUserInfo(this.basicUserInfo);
  }
}
