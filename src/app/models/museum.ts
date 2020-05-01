import {WikiEntry} from './wiki-entry';

export class Museum extends WikiEntry {

  collectionList: WikiEntry[];

  constructor(name?: string, introduction?: string, image?: string, description?: string, id?: number) {
    super(name, introduction, image, description, id);
    this.collectionList = [];
  }

  public static of(wikiEntry: WikiEntry) {
    if (!wikiEntry) {
      return undefined;
    }
    return new Museum(wikiEntry.name, wikiEntry.introduction, wikiEntry.image, wikiEntry.description, wikiEntry.id);
  }
}
