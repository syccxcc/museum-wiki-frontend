import {BasicEntry} from '../../models/basic-entry';
import {Artifact} from '../../models/artifact';

export class ProtoArtifact {
  museum: BasicEntry;
  collectionList: BasicEntry[];
  artifact: Artifact;

  public toObject(): Artifact {
    this.artifact.museum = this.museum;
    this.artifact.collectionList = this.collectionList;
    return this.artifact;
  }
}
