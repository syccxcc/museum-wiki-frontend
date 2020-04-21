import {WikiEntry} from './WikiEntry';

export class Collection extends WikiEntry {
  museum: WikiEntry;
  artifacts: WikiEntry[];

  constructor(self: WikiEntry, museum: WikiEntry) {
    super(self.name, self.introduction, self.image, self.description, self.id);
    this.museum = museum;
  }
}
