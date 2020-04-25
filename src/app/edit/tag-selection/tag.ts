import {BasicEntry} from '../../models/basic-entry';

export class Tag {
  id: number;
  name: string;
  selected: boolean;

  constructor(entry: BasicEntry, selected: boolean = false) {
    this.id = entry.id;
    this.name = entry.name;
    this.selected = selected;
  }

  static of(entry: BasicEntry): Tag {
    return new Tag(entry);
  }
}
