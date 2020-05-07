import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {BasicUserInfo} from '../../models/basic-user-info';
import {LoginService} from './login.service';
import {CookieService} from 'ngx-cookie-service';
import {ServerResponse} from '../server-response';
import {User} from '../../models/user';
import {Observable, Subject} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {ProtoUser} from '../object-prototypes/proto-user';
import {MuseumBuilder} from '../../models/builders/museum-builder';
import {ProtoEdit} from '../object-prototypes/proto-edit';
import {Mocker} from '../mocker';

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

  /**
   * reset login status to not logged in and remove cookies storing user account information
   */
  public logout(): void {
    this.isLoggedIn = false;
    this.basicUserInfo = undefined;
    this.clearCookies();
    this.loginEvent.next(false);
  }

  private mockProtoUser(): Observable<ProtoUser> {
    return new Observable<ProtoUser>((observer) => {
      const mockUser = new ProtoUser();
      mockUser.user = new User('peter', 'lih@s.com');
      mockUser.museumList = [
        new MuseumBuilder().id(1).name('test').build(),
        new MuseumBuilder().id(2).name('abc').build(),
        new MuseumBuilder().id(3).name('zcx').build()];
      const editSize = 10;
      const mockEdits = new Array<ProtoEdit>(editSize);
      for (let i = 0; i < editSize; i++) {
        mockEdits[i] = Mocker.mockProtoEdit();
      }
      mockUser.actionsList = mockEdits.filter((protoEdit) => protoEdit.approvalStatus === 'Under review');
      mockUser.editsList = mockEdits;
      observer.next(mockUser);
    });
  }

  public getCompleteUserInfo(): Observable<ProtoUser> {
    return this.loginService.getCompleteUserInfo(this.basicUserInfo);
  }

  public trackLoginStatus(): Observable<boolean> {
    return this.loginEvent.asObservable();
  }
}
