import {Injectable} from '@angular/core';
import {BasicUserInfo} from '../models/BasicUserInfo';
import {LoginService} from './login.service';
import {CookieService} from 'ngx-cookie-service';
import {ServerResponse} from './user/ServerResponse';

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

    // TODO: login automatically with cookie
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
      } else {
        this.isLoggedIn = false;
      }
    });
    return loginPromise;
  }
}
