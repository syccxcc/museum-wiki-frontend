import {WikiEntry} from '../../models/wiki-entry';
import {Collection} from '../../models/collection';
import {Artifact} from '../../models/artifact';
import {CollectionBuilder} from '../../models/builders/collection-builder';

export class ProtoCollection {
  museum: WikiEntry;
  collection: Collection;
  artifactList: Artifact[];

  static toCollection(protoCollection: ProtoCollection): Collection {
    if (!protoCollection) {
      return undefined;
    }
    return new CollectionBuilder()
      .museum(protoCollection.museum)
      .wikiEntry(protoCollection.collection)
      .artifacts(protoCollection.artifactList)
      .build();
  }
}
