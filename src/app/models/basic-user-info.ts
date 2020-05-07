import {HashHelper} from '../helper/hash-helper';

/**
 * Minimum user info required for login
 */
export class BasicUserInfo {
  /**
   * Username must be unique.
   */
  username: string;
  /**
   * Password is stored automatically in SHA512 hash.
   */
  password: string;

  /**
   * Create new basic user info. Convert password automatically to hash.
   *
   * @param username Username
   * @param password A string of either raw password or hash. If length is not 128, assume it's not a hash and hash it.
   */
  constructor(username?: string, password?: string) {
    this.username = username;
    if (password && password.length !== 128) {
      this.password = HashHelper.hash(password);
    } else {
      this.password = password;
    }
  }
}
