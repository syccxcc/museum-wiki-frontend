import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {BasicUserInfo} from '../../models/basic-user-info';
import {LoginService} from './login.service';
import {CookieService} from 'ngx-cookie-service';
import {ServerResponse} from '../server-response';
import {User} from '../../models/user';
import {Observable, Subject} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  isLoggedIn: boolean;
  basicUserInfo: BasicUserInfo;

  loginEvent = new Subject<boolean>();

  constructor(private loginService: LoginService,
              private cookieService: CookieService) {
    this.isLoggedIn = false;
    this.basicUserInfo = null;

    if (cookieService.check('username') && cookieService.check('password')) {
      this
        .login(new BasicUserInfo(cookieService.get('username'), cookieService.get('password')))
        .then((res: ServerResponse) => {
          if (!res.success) {
            this.clearCookies();
          }
        }, (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.clearCookies();
          }
        });
    }
  }

  private clearCookies(): void {
    this.cookieService.delete('username');
    this.cookieService.delete('password');
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
          this.loginEvent.next(true);

          this.cookieService.set('username', loginCredentials.username);
          this.cookieService.set('password', loginCredentials.password);

        } else {
          this.isLoggedIn = false;
          this.loginEvent.next(false);
        }
      },
      (error) => {
        console.log(error);
      });
    return loginPromise;
  }

  public logout(): void {
    this.isLoggedIn = false;
    this.loginEvent.next(false);
  }

  public getCompleteUserInfo(): Promise<User> {
    return this.loginService.getCompleteUserInfo(this.basicUserInfo);
  }

  public trackLoginStatus(): Observable<boolean> {
    return this.loginEvent.asObservable();
  }

}
