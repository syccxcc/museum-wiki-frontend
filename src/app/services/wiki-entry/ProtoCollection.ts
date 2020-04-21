import {WikiEntry} from '../../models/WikiEntry';
import {Collection} from '../../models/Collection';
import {Artifact} from '../../models/Artifact';

export class ProtoCollection {
  museum: WikiEntry;
  collection: Collection;
  artifacts: Artifact[];

  public toCollection(): Collection {
    this.collection.museum = this.museum;
    this.collection.artifacts = this.artifacts;
    return this.collection;
  }
}
