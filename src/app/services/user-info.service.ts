import {Injectable} from '@angular/core';
import {BasicUserInfo} from '../models/BasicUserInfo';
import {LoginService} from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private loginService: LoginService) {
  }

  isLoggedIn: boolean;
  basicUserInfo: BasicUserInfo;

  public getBasicUserInfo(): BasicUserInfo {
    return this.isLoggedIn ? this.basicUserInfo : null;
  }

  public login(loginCredentials: BasicUserInfo): Promise<any> {
    return this.loginService.login(loginCredentials);
  }
}
