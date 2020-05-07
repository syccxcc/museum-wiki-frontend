import {WikiEntry} from './wiki-entry';

/**
 * A museum containing collections.
 */
export class Museum extends WikiEntry {

  /**
   * An array of collections in this museum
   */
  collectionList: WikiEntry[];

  /**
   * Creates a museum object with basic information and no collections
   *
   * @param name Name of museum
   * @param introduction Introduction
   * @param image Url of image
   * @param description Description of museum in Markdown
   * @param id Id of museum, potentially empty
   */
  constructor(name?: string, introduction?: string, image?: string, description?: string, id?: number) {
    super(name, introduction, image, description, id);
    this.collectionList = [];
  }

  /**
   * Static factory that generates a museum based on an existing entry
   *
   * @param wikiEntry A museum entry of which this method makes a copy
   */
  public static of(wikiEntry: WikiEntry) {
    if (!wikiEntry) {
      return undefined;
    }
    return new Museum(wikiEntry.name, wikiEntry.introduction, wikiEntry.image, wikiEntry.description, wikiEntry.id);
  }
}
