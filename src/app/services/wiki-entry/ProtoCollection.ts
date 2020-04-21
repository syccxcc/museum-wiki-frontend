import {WikiEntry} from '../../models/WikiEntry';
import {Collection} from '../../models/Collection';
import {Artifact} from '../../models/Artifact';

export class ProtoCollection {
  museum: WikiEntry;
  collection: Collection;
  artifacts: Artifact[];

  public static toCollection(protoCollection: ProtoCollection): Collection {
    protoCollection.collection.museum = protoCollection.museum;
    protoCollection.collection.artifacts = protoCollection.artifacts ? protoCollection.artifacts : [];
    return protoCollection.collection;
  }
}
