import {User} from '../../models/user';
import {WikiEntry} from '../../models/wiki-entry';
import {ProtoEdit} from './proto-edit';

/**
 * A user object sent by the backend
 */
export class ProtoUser {
  /**
   * The user object containing only username and email
   */
  user: User;
  /**
   * List of museum the user owns
   */
  museumList: WikiEntry[];
  /**
   * List of all museums reserved for head curator
   */
  headCuratorList: WikiEntry[];
  /**
   * List of edits waiting for review of this user
   */
  actionsList: ProtoEdit[];
  /**
   * List of edits submitted by this user
   */
  editsList: ProtoEdit[];

  /**
   * Convert a protoUser to User
   *
   * @param protoUser The ProtoUser to be converted
   */
  static toUser(protoUser: ProtoUser): User {
    protoUser.user.museumList = protoUser.museumList;
    protoUser.user.headCuratorList = protoUser.headCuratorList;
    protoUser.user.actionsList = protoUser.actionsList?.map(protoEdit => ProtoEdit.toEdit(protoEdit));
    protoUser.user.editsList = protoUser.editsList?.map(protoEdit => ProtoEdit.toEdit(protoEdit));
    return protoUser.user;
  }
}
