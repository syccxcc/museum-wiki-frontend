export class WikiEntry {
  public static readonly noImageMessage = 'no link provided for image';

  name: string;
  introduction: string;
  description: string;
  id: string;
  private imageAddress: string;

  constructor(name: string, introduction: string, image: string, description: string, id: string) {
    this.name = name;
    this.introduction = introduction;
    this.image = image;
    this.description = description;
    this.id = id;
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
