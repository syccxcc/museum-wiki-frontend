import {WikiEntryBuilder} from './wiki-entry-builder';
import {Collection} from '../collection';
import {BasicEntry} from '../basic-entry';
import {WikiEntry} from '../wiki-entry';

export class CollectionBuilder extends WikiEntryBuilder<CollectionBuilder, Collection> {
  constructor() {
    super(Collection);
  }

  museum(museum: BasicEntry): CollectionBuilder {
    this.entry.museum = museum;
    return this;
  }

  artifacts(artifacts: WikiEntry[]): CollectionBuilder {
    this.entry.artifacts = artifacts;
    return this;
  }
}
