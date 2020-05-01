import {Artifact} from './artifact';
import {Collection} from './collection';
import {Museum} from './museum';

export class Edit {
  id: number;
  type: string;
  category: string;
  artifact: Artifact;
  collection: Collection;
  museum: Museum;
  approvalStatus: string;
}
