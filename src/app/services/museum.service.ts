import { Injectable } from '@angular/core';
import {ServerConfigService} from './server-config.service';
import {Museum} from '../models/Museum';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MuseumService {

  private readonly url: string;

  constructor(private serverConfigService: ServerConfigService,
              private http: HttpClient) {
    this.url = serverConfigService.getServerConfig().getUrl();
  }

  public getMuseumList(): Promise<Museum[]> {
    return this.http.get<Museum[]>(this.url + 'museum-list/').toPromise();
  }
}
