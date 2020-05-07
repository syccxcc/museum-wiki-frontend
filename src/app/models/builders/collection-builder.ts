import {WikiEntryBuilder} from './wiki-entry-builder';
import {Collection} from '../collection';
import {BasicEntry} from '../basic-entry';
import {WikiEntry} from '../wiki-entry';

/**
 * Builder for the Collection class
 */
export class CollectionBuilder extends WikiEntryBuilder<CollectionBuilder, Collection> {
  /**
   * Creates a collection in the entry field
   */
  constructor() {
    super(Collection);
  }

  /**
   * Builder method for museum field
   *
   * @param museum The museum to which this collection belongs
   */
  museum(museum: BasicEntry): CollectionBuilder {
    this.entry.museum = museum;
    return this;
  }

  /**
   * Builder method for artifact field
   *
   * @param artifacts Array of artifacts belonging to this collection
   */
  artifacts(artifacts: WikiEntry[]): CollectionBuilder {
    this.entry.artifacts = artifacts;
    return this;
  }
}
