import {Museum} from '../../models/museum';
import {WikiEntry} from '../../models/wiki-entry';

/**
 * A museum passed from the backend
 */
export class ProtoMuseum {
  /**
   * The museum object itself
   */
  museum: Museum;
  /**
   * A list of collections belonging to this museum
   */
  collectionList: WikiEntry[];
}
