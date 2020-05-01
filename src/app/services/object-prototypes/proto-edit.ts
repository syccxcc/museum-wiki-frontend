import {Artifact} from '../../models/artifact';
import {Collection} from '../../models/collection';
import {ProtoArtifact} from './proto-artifact';
import {Edit} from '../../models/edit';
import {EditBuilder} from '../../models/builders/edit-builder';
import {ProtoCollection} from './proto-collection';
import {CollectionBuilder} from '../../models/builders/collection-builder';
import {ProtoMuseum} from './proto-museum';
import {Museum} from '../../models/museum';

export class ProtoEdit {
  id: number;
  type: string;
  category: string;
  artifact: ProtoArtifact;
  collection: ProtoCollection;
  museum: ProtoMuseum;
  approvalStatus: string;

  static toEdit(protoEdit: ProtoEdit): Edit {
    return new EditBuilder()
      .id(protoEdit.id)
      .museum(Museum.of(protoEdit.museum?.museum))
      .collection(ProtoCollection.toCollection(protoEdit.collection))
      .artifact(ProtoArtifact.toArtifact(protoEdit.artifact))
      .category(protoEdit.category)
      .type(protoEdit.type)
      .approvalStatus(protoEdit.approvalStatus)
      .build();
  }
}
