import {User} from '../../models/user';
import {WikiEntry} from '../../models/wiki-entry';
import {ProtoEdit} from './proto-edit';

export class ProtoUser {
  user: User;
  museumList: WikiEntry[];
  headCuratorList: WikiEntry[];
  actionsList: ProtoEdit[];
  editsList: ProtoEdit[];

  static toUser(protoUser: ProtoUser): User {
    protoUser.user.museumList = protoUser.museumList;
    protoUser.user.actionsList = protoUser.actionsList?.map(protoEdit => ProtoEdit.toEdit(protoEdit));
    protoUser.user.editsList = protoUser.editsList?.map(protoEdit => ProtoEdit.toEdit(protoEdit));
    return protoUser.user;
  }
}
