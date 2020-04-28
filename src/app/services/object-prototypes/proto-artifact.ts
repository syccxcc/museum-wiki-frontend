import {BasicEntry} from '../../models/basic-entry';
import {Artifact} from '../../models/artifact';
import {Prototype} from './prototype';

export class ProtoArtifact implements Prototype<Artifact> {
  museum: BasicEntry;
  collectionList: BasicEntry[];
  artifact: Artifact;

  public toObject(): Artifact {
    this.artifact.museum = this.museum;
    this.artifact.collectionList = this.collectionList;
    return this.artifact;
  }
}
