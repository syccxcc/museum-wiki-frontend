import {BasicUserInfo} from '../../models/basic-user-info';
import {User} from '../../models/user';
import {WikiEntry} from '../../models/wiki-entry';
import {Edit} from '../../models/edit';
import {ProtoEdit} from './proto-edit';

export class ProtoUser {
  user: User;
  museumList: WikiEntry[];
  actionsList: ProtoEdit[];
  editsList: ProtoEdit[];

  toUser(): User {
    this.user.museumList = this.museumList;
    this.user.actionsList = this.actionsList?.map(protoEdit => protoEdit.toEdit());
    this.user.editsList = this.editsList?.map(protoEdit => protoEdit.toEdit());
    return this.user;
  }
}
