import {WikiEntry} from '../../models/WikiEntry';
import {Collection} from '../../models/Collection';

export class ProtoCollection {
  museum: WikiEntry;
  collection: Collection;

  public toCollection(): Collection {
    this.collection.museumId = this.museum.id;
    this.collection.museumName = this.museum.name;
    return this.collection;
  }
}
