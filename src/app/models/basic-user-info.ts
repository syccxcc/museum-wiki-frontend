import {HashHelper} from '../helper/hash-helper';

export class BasicUserInfo {
  username: string;
  password: string;

  constructor(username?: string, password?: string) {
    this.username = username;
    if (password && password.length !== 128) {
      this.password = HashHelper.hash(password);
    } else {
      this.password = password;
    }
  }
}
