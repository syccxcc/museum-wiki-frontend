import {BasicUserInfo} from './basic-user-info';
import {BasicEntry} from './basic-entry';
import {Edit} from './edit';
import {WikiEntry} from './wiki-entry';

export class User extends BasicUserInfo {
  email: string;
  museumList: WikiEntry[];
  actionsList: Edit[];
  editsList: Edit[];
  headCuratorList: WikiEntry[];

  constructor(username?: string, email?: string, password?: string) {
    super(username, password);
    this.email = email;
  }
}
