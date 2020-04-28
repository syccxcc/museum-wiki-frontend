import {WikiEntry} from '../../models/wiki-entry';
import {Collection} from '../../models/collection';
import {Artifact} from '../../models/artifact';

export class ProtoCollection {
  museum: WikiEntry;
  collection: Collection;
  artifactList: Artifact[];
}
