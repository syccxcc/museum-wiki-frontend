import {BasicEntry} from '../../models/basic-entry';

/**
 * A tag (collection) for an artifact
 */
export class Tag {
  /**
   * Id of current tag.
   * Same as id of collection.
   */
  id: number;
  /**
   * Name of current tag.
   * Same as name of collection.
   */
  name: string;
  /**
   * Whether the current tag is selected.
   */
  selected: boolean;

  /**
   * Constructor
   *
   * @param entry The entry from which this tag is created.
   * @param selected Whether this tag is selected. Default to false.
   */
  constructor(entry: BasicEntry, selected: boolean = false) {
    this.id = entry.id;
    this.name = entry.name;
    this.selected = selected;
  }

  /**
   * Static factory that creates a tag from an entry
   *
   * @param entry The entry upon which the newly created tag is based
   */
  static of(entry: BasicEntry): Tag {
    return new Tag(entry);
  }
}
