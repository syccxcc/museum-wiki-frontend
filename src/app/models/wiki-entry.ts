import {BasicEntry} from './basic-entry';
import {WikiEntryBuilder} from './builders/wiki-entry-builder';

export class WikiEntry extends BasicEntry {
  public static readonly noImageMessage = 'no link provided for image';

  introduction: string;
  description: string;
  image: string;

  constructor(name?: string, introduction?: string, image?: string, description?: string, id?: number) {
    super(name, id);
    this.introduction = introduction;
    this.image = image;
    this.description = description;
  }

}
