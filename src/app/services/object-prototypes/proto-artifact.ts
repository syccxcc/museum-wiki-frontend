import {BasicEntry} from '../../models/basic-entry';
import {Artifact} from '../../models/artifact';

export class ProtoArtifact {
  museum: BasicEntry;
  collection: BasicEntry;
  artifact: Artifact;

  public toArtifact(): Artifact {
    this.artifact.museum = this.museum;
    this.artifact.collection = this.collection;
    return this.artifact;
  }
}
