import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Museum} from '../../models/Museum';
import {ServerResponse} from '../user/ServerResponse';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  private readonly museums = [
    new Museum('Pfaffmann Museum', 'A museum created by Pfaffmann.', '# Title', '1'),
    new Museum('Smith Museum', 'A museum created by Smith', '# Title', '2'),
    new Museum('Lekso Museum', 'A museum created by Lekso', '[link](google.com)', '3')];

  constructor() {
  }

  public createDb() {
    return {
      'login/1': new ServerResponse(true, 'login successful!'),
      'museum-list': this.museums,
      'museum/1': this.museums[0],
      'museum/2': this.museums[1],
      'museum/3': this.museums[2],
    };
  }
}
