import {WikiEntry} from '../../models/wiki-entry';
import {Collection} from '../../models/collection';
import {Artifact} from '../../models/artifact';
import {CollectionBuilder} from '../../models/builders/collection-builder';

/**
 * A collection received from the backend
 */
export class ProtoCollection {
  /**
   * Museum to which this collection belongs
   */
  museum: WikiEntry;
  /**
   * The collection object itself
   */
  collection: Collection;
  /**
   * The list of artifacts this collection contains
   */
  artifactList: Artifact[];

  /**
   * Converts a protoCollection to a Collection object
   *
   * @param protoCollection The protoCollection to be converted
   */
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
