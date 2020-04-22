import {BasicEntry} from './basic-entry';

export class WikiEntry extends BasicEntry {
  public static readonly noImageMessage = 'no link provided for image';

  introduction: string;
  description: string;
  private imageAddress: string;

  constructor(name: string, introduction: string, image: string, description: string, id: string) {
    super(name, id);
    this.introduction = introduction;
    this.image = image;
    this.description = description;
  }

  public static of(wikiEntry: WikiEntry) {
    return new WikiEntry(wikiEntry.name, wikiEntry.introduction, wikiEntry.description, wikiEntry.image, wikiEntry.id);
  }


  get image(): string {
    return this.imageAddress ? this.imageAddress : '';
  }

  set image(value: string) {
    this.imageAddress = value;
  }
}
