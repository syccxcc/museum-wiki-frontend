import {WikiEntry} from './wiki-entry';
import {BasicEntry} from './basic-entry';

export class Collection extends WikiEntry {
  museum: BasicEntry;
  artifacts: WikiEntry[];

  constructor(self?: WikiEntry, museum?: BasicEntry) {
    super(self?.name, self?.introduction, self?.image, self?.description, self?.id);
    this.museum = museum;
    this.artifacts = [];
  }
}
