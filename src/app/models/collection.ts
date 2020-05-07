import {WikiEntry} from './wiki-entry';
import {BasicEntry} from './basic-entry';

/**
 * A collection in a museum, which functions like a tag.
 */
export class Collection extends WikiEntry {
  /**
   * The museum to which this collection belongs
   */
  museum: BasicEntry;
  /**
   * The artifacts that belong to this collection
   */
  artifacts: WikiEntry[];

  /**
   * Create a collection object.
   *
   * @param self An object containing basic information of a collection (name, id, description , etc.)
   * @param museum The museum to which this collection belongs
   */
  constructor(self?: WikiEntry, museum?: BasicEntry) {
    super(self?.name, self?.introduction, self?.image, self?.description, self?.id);
    this.museum = museum;
    this.artifacts = [];
  }
}
