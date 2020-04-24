import {WikiEntry} from '../wiki-entry';
import {BasicEntryBuilder} from './basic-entry-builder';

export class WikiEntryBuilder<T extends WikiEntryBuilder<T, E>, E extends WikiEntry>
  extends BasicEntryBuilder<T, E> {

  constructor(Type) {
    super(Type);
  }

  public introduction(introduction: string): T {
    this.entry.introduction = introduction;
    return this.self();
  }

  public image(image: string): T {
    this.entry.image = image;
    return this.self();
  }

  public description(description: string): T {
    this.entry.description = description;
    return this.self();
  }

  public wikiEntry(entry: WikiEntry): T {
    for (const property in entry) {
      if (entry.hasOwnProperty(property)) {
        this.entry[property] = entry[property];
      }
    }
    return this.self();
  }

  public build(): E {
    return this.entry;
  }

  public self(): T {
    return this as unknown as T;
  }
}
