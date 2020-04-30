import {User} from '../../models/user';
import {WikiEntry} from '../../models/wiki-entry';
import {ProtoEdit} from './proto-edit';

export class ProtoUser {
  user: User;
  museumList: WikiEntry[];
  actionsList: ProtoEdit[];
  editsList: ProtoEdit[];

  static toUser(protoUser: ProtoUser): User {
    protoUser.user.museumList = protoUser.museumList;
    protoUser.user.actionsList = protoUser.actionsList?.map(protoEdit => protoEdit.toEdit());
    protoUser.user.editsList = protoUser.editsList?.map(protoEdit => protoEdit.toEdit());
    return protoUser.user;
  }
}
