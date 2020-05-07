import {BasicEntry} from './basic-entry';
import {WikiEntryBuilder} from './builders/wiki-entry-builder';

/**
 * An entry in Museum Wiki.
 * Can be either museum, collection, or artifact.
 */
export class WikiEntry extends BasicEntry {
  /**
   * The introductory text for the entry.
   * Must be in plain text.
   */
  introduction: string;
  /**
   * Detailed description for the entry.
   * Must be in Markdown
   */
  description: string;
  /**
   * A url to the image that is displayed.
   */
  image: string;

  /**
   * Constructor that initializes all fields
   *
   * @param name Name of entry
   * @param introduction Introduction
   * @param image Image url
   * @param description Markdown description
   * @param id Id of entry
   */
  constructor(name?: string, introduction?: string, image?: string, description?: string, id?: number) {
    super(name, id);
    this.introduction = introduction;
    this.image = image;
    this.description = description;
  }

}
