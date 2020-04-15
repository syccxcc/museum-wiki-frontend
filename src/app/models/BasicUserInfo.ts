import {HashHelper} from '../helper/HashHelper';

export class BasicUserInfo {
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    if (password.length !== 128) {
      this.password = HashHelper.hash(password);
    } else {
      this.password = password;
    }
  }
}
