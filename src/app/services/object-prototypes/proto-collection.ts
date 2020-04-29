import {WikiEntry} from '../../models/wiki-entry';
import {Collection} from '../../models/collection';
import {Artifact} from '../../models/artifact';
import {CollectionBuilder} from '../../models/builders/collection-builder';

export class ProtoCollection {
  museum: WikiEntry;
  collection: Collection;
  artifactList: Artifact[];

  toCollection(): Collection {
    return new CollectionBuilder()
      .museum(this.museum)
      .wikiEntry(this.collection)
      .artifacts(this.artifactList)
      .build();
  }
}
