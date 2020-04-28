import {WikiEntry} from '../../models/wiki-entry';
import {Collection} from '../../models/collection';
import {Artifact} from '../../models/artifact';
import {Prototype} from './prototype';

export class ProtoCollection implements Prototype<Collection> {
  museum: WikiEntry;
  collection: Collection;
  artifactList: Artifact[];

  public toObject(): Collection {
    this.collection.museum = this.museum;
    this.collection.artifacts = this.artifactList ? this.artifactList : [];
    return this.collection;
  }
}
