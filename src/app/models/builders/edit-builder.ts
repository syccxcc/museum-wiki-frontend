import {Edit} from '../edit';
import {Artifact} from '../artifact';
import {Collection} from '../collection';

export class EditBuilder {
  edit: Edit;

  constructor() {
    this.edit = new Edit();
  }

  id(id: number): EditBuilder {
    this.edit.id = id;
    return this;
  }

  type(type: string): EditBuilder {
    this.edit.type = type;
    return this;
  }

  category(category: string): EditBuilder {
    this.edit.category = category;
    return this;
  }

  artifact(value: Artifact): EditBuilder {
    this.edit.artifact = value;
    return this;
  }

  collection(value: Collection): EditBuilder {
    this.edit.collection = value;
    return this;
  }

  approvalStatus(value: string): EditBuilder {
    this.edit.approvalStatus = value;
    return this;
  }

  build(): Edit {
    return this.edit;
  }
}
