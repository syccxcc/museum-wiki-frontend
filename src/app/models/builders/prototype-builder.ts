import {ProtoMuseum} from '../../services/object-prototypes/proto-museum';
import {ProtoCollection} from '../../services/object-prototypes/proto-collection';
import {ProtoArtifact} from '../../services/object-prototypes/proto-artifact';
import {MuseumBuilder} from './museum-builder';
import {WikiEntry} from '../wiki-entry';
import {Collection} from '../collection';
import {Museum} from '../museum';
import {Artifact} from '../artifact';
import {CollectionBuilder} from './collection-builder';
import {ArtifactBuilder} from './artifact-builder';

/**
 * Build museum/collection/artifact from prototype
 */
export class PrototypeBuilder {
  /**
   * Build museum/collection/artifact from prototype
   *
   * @param prototype The prototype from which the object is built
   */
  static buildFromPrototype(prototype:
                              {
                                museum?: ProtoMuseum,
                                collection?: ProtoCollection,
                                artifact?: ProtoArtifact
                              }): Museum | Collection | Artifact {
    if (prototype.museum) {
      return new MuseumBuilder().wikiEntry(prototype.museum.museum).collections(prototype.museum.collectionList).build();
    }
    if (prototype.collection) {
      const res = prototype.collection;
      return new CollectionBuilder()
        .wikiEntry(res.collection)
        .artifacts(res.artifactList)
        .museum(res.museum)
        .build();
    }
    if (prototype.artifact) {
      const res = prototype.artifact;
      return new ArtifactBuilder()
        .wikiEntry(res.artifact)
        .museum(res.museum)
        .collectionList(res.collectionList)
        .build();
    }
  }
}
