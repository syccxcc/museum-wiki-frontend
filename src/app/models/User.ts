import {BasicUserInfo} from './BasicUserInfo';

export class User extends BasicUserInfo {
  email: string;

  constructor(username: string, email: string, password?: string) {
    super(username, password ? password : '');
    this.email = email;
  }
}
