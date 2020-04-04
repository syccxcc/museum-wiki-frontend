import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Museum} from '../models/Museum';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  private readonly museums = [
    new Museum('Pfaffmann Museum', 'A museum created by Pfaffmann.', 'p', 1),
    new Museum('Smith Museum', 'A museum created by Smith', 's', 1),
    new Museum('Lekso Museum', 'A museum created by Lekso', 'l', 1)];

  constructor() { }

  public createDb() {
    return {'museum-list': this.museums};
  }
}
