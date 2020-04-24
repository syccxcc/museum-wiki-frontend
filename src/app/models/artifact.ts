import {WikiEntry} from './wiki-entry';
import {BasicEntry} from './basic-entry';

export class Artifact extends WikiEntry {
  museum: BasicEntry;
  collection: BasicEntry;

  tags: string[];
}
