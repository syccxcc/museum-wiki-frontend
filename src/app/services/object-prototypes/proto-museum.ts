import {Museum} from '../../models/museum';
import {WikiEntry} from '../../models/wiki-entry';
import {Prototype} from './prototype';

export class ProtoMuseum implements Prototype<Museum> {
  museum: Museum;
  collectionList: WikiEntry[];

  public toObject(): Museum {
    this.museum.collectionList = this.collectionList;
    return this.museum;
  }
}
