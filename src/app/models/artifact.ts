import {WikiEntry} from './wiki-entry';
import {BasicEntry} from './basic-entry';

/**
 * An artifact in some collections of a certain museum
 */
export class Artifact extends WikiEntry {
  /**
   * Information of the museum to which this artifact belongs
   */
  museum: BasicEntry;
  /**
   * List of collections to which this museum belongs
   */
  collectionList: BasicEntry[];
}
