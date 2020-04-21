import {WikiEntry} from './WikiEntry';

export class Collection extends WikiEntry {
  museumName: string;
  museumId: string;

  constructor(self: WikiEntry, museum: WikiEntry) {
    super(self.name, self.introduction, self.image, self.description, self.id);
    this.museumName = museum.name;
    this.museumId = museum.id;
  }
}
