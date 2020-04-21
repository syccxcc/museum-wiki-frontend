import {WikiEntry} from '../../models/WikiEntry';

export interface WikiEntryService {
  getWithId(id: string): Promise<WikiEntry>;
}
