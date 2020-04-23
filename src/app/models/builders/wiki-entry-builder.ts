import {WikiEntry} from '../wiki-entry';

export class WikiEntryBuilder {
  entry: WikiEntry;

  constructor() {
    this.entry = new WikiEntry();
  }

  public name(name: string): WikiEntryBuilder {
    this.entry.name = name;
    return this;
  }

  public id(id: number): WikiEntryBuilder {
    this.entry.id = id;
    return this;
  }

  public introduction(introduction: string): WikiEntryBuilder {
    this.entry.introduction = introduction;
    return this;
  }

  public image(image: string): WikiEntryBuilder {
    this.entry.image = image;
    return this;
  }

  public description(description: string): WikiEntryBuilder {
    this.entry.description = description;
    return this;
  }

  public build(): WikiEntry {
    return this.entry;
  }
}
