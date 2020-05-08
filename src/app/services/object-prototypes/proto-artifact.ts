import {BasicEntry} from '../../models/basic-entry';
import {Artifact} from '../../models/artifact';

/**
 * Artifact object received from the server
 */
export class ProtoArtifact {
  /**
   * The museum to which this artifact belongs
   */
  museum: BasicEntry;
  /**
   * List of collections associated with this artifact
   */
  collectionList: BasicEntry[];
  /**
   * Basic info of the current artifact
   */
  artifact: Artifact;

  /**
   * Converts a proto artifact into an Artifact object
   *
   * @param protoArtifact The object to be converted
   */
  public static toArtifact(protoArtifact: ProtoArtifact): Artifact {
    if (!protoArtifact || !protoArtifact.artifact) {
      return undefined;
    }
    protoArtifact.artifact.museum = protoArtifact.museum;
    protoArtifact.artifact.collectionList = protoArtifact.collectionList;
    return protoArtifact.artifact;
  }
}
