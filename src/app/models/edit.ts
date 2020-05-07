import {Artifact} from './artifact';
import {Collection} from './collection';
import {Museum} from './museum';

/**
 * Describes a change made to an object.
 * Can be either add, delete, or edit something.
 */
export class Edit {
  /**
   * The id of this edit
   */
  id: number;
  /**
   * The type of edit: addition, deletion, edit
   */
  type: string;
  /**
   * Category of the modified object: museum, collection, artifact
   */
  category: string;
  /**
   * If an artifact is changed, the changed object will be stored here.
   * If not, this will be undefined.
   */
  artifact: Artifact;
  /**
   * If a collection is changed, the changed object will be stored here.
   * If not, this will be undefined.
   */
  collection: Collection;
  /**
   * If a museum is changed, the changed object will be stored here.
   * If not, this will be undefined.
   */
  museum: Museum;
  /**
   * Whether this edit is approved.
   * Can be: approved, denied, or under review
   */
  approvalStatus: string;
  /**
   * The date and time at which this edit proposal is made.
   * Should be a ISO 8601 date representation.
   */
  date: string;
  /**
   * The username of the person responsible for reviewing it.
   */
  reviewerUsername: string;
}
