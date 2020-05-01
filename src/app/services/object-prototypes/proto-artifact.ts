import {BasicEntry} from '../../models/basic-entry';
import {Artifact} from '../../models/artifact';

export class ProtoArtifact {
  museum: BasicEntry;
  collectionList: BasicEntry[];
  artifact: Artifact;

  public static toArtifact(protoArtifact: ProtoArtifact): Artifact {
    if (!protoArtifact || !protoArtifact.artifact) {
      return undefined;
    }
    protoArtifact.artifact.museum = protoArtifact.museum;
    protoArtifact.artifact.collectionList = protoArtifact.collectionList;
    return protoArtifact.artifact;
  }
}
