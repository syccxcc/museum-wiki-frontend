import {SearchResult} from '../search/SearchResult';

export class Museum extends SearchResult {
  curatorId: number;

  constructor(name: string, description: string, link: string, curatorId: number) {
    super(name, description, link);
    this.curatorId = curatorId;
  }
}
