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

  public collection(collection: BasicEntry): ArtifactBuilder {
    this.entry.collection = collection;
    return this;
  }

  public tags(tags: string[]): ArtifactBuilder {
    this.entry.tags = tags;
    return this;
  }
}
