import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Museum} from '../models/Museum';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  private readonly museums = [
    new Museum('Pfaffmann Museum', 'A museum created by Pfaffmann.', '1'),
    new Museum('Smith Museum', 'A museum created by Smith', '2'),
    new Museum('Lekso Museum', 'A museum created by Lekso', '3')];

  constructor() { }

  public createDb() {
    return {'museum-list': this.museums};
  }
}
