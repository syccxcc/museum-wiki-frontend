import {Artifact} from '../../models/artifact';
import {Collection} from '../../models/collection';
import {ProtoArtifact} from './proto-artifact';
import {Edit} from '../../models/edit';
import {EditBuilder} from '../../models/builders/edit-builder';
import {ProtoCollection} from './proto-collection';
import {CollectionBuilder} from '../../models/builders/collection-builder';

export class ProtoEdit {
  id: number;
  type: string;
  category: string;
  artifact: ProtoArtifact;
  collection: ProtoCollection;
  approvalStatus: string;

  toEdit(): Edit {
    return new EditBuilder()
      .id(this.id)
      .artifact(this.artifact.toObject())
      .category(this.category)
      .type(this.type)
      .collection(this.collection.toCollection())
      .approvalStatus(this.approvalStatus)
      .build();
  }
}
