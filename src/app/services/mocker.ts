import {ProtoEdit} from './object-prototypes/proto-edit';

export class Mocker {
  static readonly categories = ['museum', 'collection', 'artifact'];
  static readonly types = ['create', 'delete', 'edit'];
  static readonly statuses = ['Approved', 'Denied', 'Under review'];

  private static randomElement(array: Array<any>) {
    return array[Math.floor(Math.random() * array.length)];
  }

  static mockProtoEdit(): ProtoEdit {
    const edit: ProtoEdit = new ProtoEdit();
    edit.id = Math.floor(Math.random() * 1000);
    edit.category = this.randomElement(this.categories);
    edit.type = this.randomElement(this.types);
    edit.approvalStatus = this.randomElement(this.statuses);
    return edit;
  }
}
