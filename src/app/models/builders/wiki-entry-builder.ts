import {WikiEntry} from '../wiki-entry';
import {BasicEntryBuilder} from './basic-entry-builder';

/**
 * Builder for Wiki Entry
 */
export class WikiEntryBuilder<T extends WikiEntryBuilder<T, E>, E extends WikiEntry>
  extends BasicEntryBuilder<T, E> {

  /**
   * Creates a new entry of a certain type
   *
   * @param Type The type of object to build
   */
  constructor(Type) {
    super(Type);
  }

  /**
   * Builder method
   *
   * @param introduction Introduction of wiki entry
   */
  public introduction(introduction: string): T {
    this.entry.introduction = introduction;
    return this.self();
  }

  /**
   * Builder method
   *
   * @param image Url of image
   */
  public image(image: string): T {
    this.entry.image = image;
    return this.self();
  }

  /**
   * Builder method
   *
   * @param description Description in Markdown of entry
   */
  public description(description: string): T {
    this.entry.description = description;
    return this.self();
  }

  /**
   * Builder method from another Wiki Entry
   *
   * @param entry A wiki entry from which the builder will copy the info
   */
  public wikiEntry(entry: WikiEntry): T {
    for (const property in entry) {
      if (entry.hasOwnProperty(property)) {
        this.entry[property] = entry[property];
      }
    }
    return this.self();
  }

  /**
   * Build a custom object that extends Wiki Entry
   */
  public build(): E {
    return this.entry;
  }

  /**
   * Returns a Builder that extends WikiEntryBuilder
   */
  public self(): T {
    return this as unknown as T;
  }
}
