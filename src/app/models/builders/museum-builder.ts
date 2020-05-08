import {WikiEntryBuilder} from './wiki-entry-builder';
import {Museum} from '../museum';
import {WikiEntry} from '../wiki-entry';

/**
 * Builder for a museum
 */
export class MuseumBuilder extends WikiEntryBuilder<MuseumBuilder, Museum> {

  /**
   * Creates a new museum
   */
  constructor() {
    super(Museum);
  }

  /**
   * Builder method
   *
   * @param collections list of collections in this museum
   */
  public collections(collections: WikiEntry[]): MuseumBuilder {
    this.entry.collectionList = collections;
    return this;
  }

  /**
   * Returns the built museum
   */
  public build(): Museum {
    return this.entry;
  }
}
