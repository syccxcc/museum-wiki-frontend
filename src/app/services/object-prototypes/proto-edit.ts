import {Artifact} from '../../models/artifact';
import {Collection} from '../../models/collection';
import {ProtoArtifact} from './proto-artifact';
import {Edit} from '../../models/edit';
import {EditBuilder} from '../../models/builders/edit-builder';
import {ProtoCollection} from './proto-collection';
import {CollectionBuilder} from '../../models/builders/collection-builder';
import {ProtoMuseum} from './proto-museum';
import {Museum} from '../../models/museum';
import {BasicUserInfo} from '../../models/basic-user-info';

/**
 * Edit received from the backend
 */
export class ProtoEdit {
  /**
   * Id of edit
   */
  id: number;
  /**
   * Type of edit (addition/deletion/edit)
   */
  type: string;
  /**
   * Category of the entry being edited
   */
  category: string;
  /**
   * The changed artifact if it exists
   */
  artifact: ProtoArtifact;
  /**
   * The changed collection if it exists
   */
  collection: ProtoCollection;
  /**
   * The changed museum if it exists
   */
  museum: ProtoMuseum;
  /**
   * Under review/Approved/Denied
   */
  approvalStatus: string;
  /**
   * ISO time string for the date this edit request is made
   */
  time: string;
  /**
   * The user responsible for reviewing this edit
   */
  reviewer: BasicUserInfo;
  /**
   * The username of the reviewer
   */
  reviewerUsername: string;

  /**
   * Convert a ProtoEdit to an Edit
   *
   * @param protoEdit The ProtoEdit to be converted
   */
  static toEdit(protoEdit: ProtoEdit): Edit {
    return new EditBuilder()
      .id(protoEdit.id)
      .museum(Museum.of(protoEdit.museum?.museum))
      .collection(ProtoCollection.toCollection(protoEdit.collection))
      .artifact(ProtoArtifact.toArtifact(protoEdit.artifact))
      .category(protoEdit.category)
      .type(protoEdit.type)
      .date(protoEdit.time)
      .approvalStatus(protoEdit.approvalStatus)
      .reviewerUsername(protoEdit.reviewer ? protoEdit.reviewer.username : protoEdit.reviewerUsername)
      .build();
  }
}
