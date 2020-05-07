import {BasicUserInfo} from './basic-user-info';
import {BasicEntry} from './basic-entry';
import {Edit} from './edit';
import {WikiEntry} from './wiki-entry';

/**
 * Detailed information of a user
 */
export class User extends BasicUserInfo {
  /**
   * Email of user
   */
  email: string;
  /**
   * List of museums owned by the user
   */
  museumList: WikiEntry[];
  /**
   * List of edits waiting to be reviewed by this user
   */
  actionsList: Edit[];
  /**
   * List of edits submitted by this user
   */
  editsList: Edit[];
  /**
   * List of all museums in Museum Wiki. Reserved for head curator.
   */
  headCuratorList: WikiEntry[];

  /**
   * Create a user object
   *
   * @param username Username
   * @param email Email address
   * @param password Password can either be a raw password or a hash.
   */
  constructor(username?: string, email?: string, password?: string) {
    super(username, password);
    this.email = email;
  }
}
