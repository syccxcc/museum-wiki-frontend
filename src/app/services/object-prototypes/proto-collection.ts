import {WikiEntry} from '../../models/wiki-entry';
import {Collection} from '../../models/collection';
import {Artifact} from '../../models/artifact';

export class ProtoCollection {
  museum: WikiEntry;
  collection: Collection;
  artifactList: Artifact[];

  public static toCollection(protoCollection: ProtoCollection): Collection {
    protoCollection.collection.museum = protoCollection.museum;
    protoCollection.collection.artifacts = protoCollection.artifactList ? protoCollection.artifactList : [];
    return protoCollection.collection;
  }
}
