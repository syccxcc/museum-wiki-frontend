import {WikiEntry} from './wiki-entry';

export class Museum extends WikiEntry {

  collections: WikiEntry[];

  constructor(name: string, introduction: string, image: string, description: string, id: string) {
    super(name, introduction, image, description, id);
    this.collections = [];
  }

  public static of(wikiEntry: WikiEntry) {
    return new Museum(wikiEntry.name, wikiEntry.introduction, wikiEntry.image, wikiEntry.description, wikiEntry.id);
  }
}
