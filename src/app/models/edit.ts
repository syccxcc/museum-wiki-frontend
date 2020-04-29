import {Artifact} from './artifact';
import {Collection} from './collection';

export class Edit {
  id: number;
  type: string;
  category: string;
  artifact: Artifact;
  collection: Collection;
  approvalStatus: string;
}
