import {WikiEntryBuilder} from './wiki-entry-builder';
import {Artifact} from '../artifact';
import {BasicEntry} from '../basic-entry';

/**
 * Builder for an Artifact object.
 */
export class ArtifactBuilder extends WikiEntryBuilder<ArtifactBuilder, Artifact> {
  /**
   * Creates an artifact with nothing in it
   */
  constructor() {
    super(Artifact);
  }

  /**
   * Set the corresponding museum of artifact
   *
   * @param museum Museum to which this artifact belongs
   */
  public museum(museum: BasicEntry): ArtifactBuilder {
    this.entry.museum = museum;
    return this;
  }

  /**
   * Builder method
   *
   * @param collection Set the collections to which this artifact belongs
   */
  public collectionList(collection: BasicEntry[]): ArtifactBuilder {
    this.entry.collectionList = collection;
    return this;
  }

  /**
   * Create an artifact object
   */
  public build(): Artifact {
    if (!this.entry.collectionList) {
      this.entry.collectionList = [];
    }
    return this.entry;
  }
}
