import {WikiEntryBuilder} from './wiki-entry-builder';
import {Artifact} from '../artifact';
import {BasicEntry} from '../basic-entry';

export class ArtifactBuilder extends WikiEntryBuilder<ArtifactBuilder, Artifact> {
  constructor() {
    super(Artifact);
  }

  public museum(museum: BasicEntry): ArtifactBuilder {
    this.entry.museum = museum;
    return this;
  }

  public collectionList(collection: BasicEntry[]): ArtifactBuilder {
    this.entry.collectionList = collection;
    return this;
  }

  public build(): Artifact {
    if (!this.entry.collectionList) {
      this.entry.collectionList = [];
    }
    return this.entry;
  }
}
