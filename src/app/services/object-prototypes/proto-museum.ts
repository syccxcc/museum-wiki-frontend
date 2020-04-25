import {Museum} from '../../models/museum';
import {WikiEntry} from '../../models/wiki-entry';

export class ProtoMuseum {
  museum: Museum;
  collectionList: WikiEntry[];

  public toMuseum(): Museum {
    this.museum.collectionList = this.collectionList;
    return this.museum;
  }
}
