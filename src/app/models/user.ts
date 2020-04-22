import {BasicUserInfo} from './basic-user-info';

export class User extends BasicUserInfo {
  email: string;

  constructor(username: string, email: string, password?: string) {
    super(username, password ? password : '');
    this.email = email;
  }
}
