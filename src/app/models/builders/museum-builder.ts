import {WikiEntryBuilder} from './wiki-entry-builder';
import {Museum} from '../museum';
import {WikiEntry} from '../wiki-entry';

export class MuseumBuilder extends WikiEntryBuilder<MuseumBuilder, Museum> {

  constructor() {
    super(Museum);
  }

  public collections(collections: WikiEntry[]): MuseumBuilder {
    this.entry.collectionList = collections;
    return this;
  }

  public build(): Museum {
    return this.entry;
  }
}
