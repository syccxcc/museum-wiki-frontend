import {Injectable} from '@angular/core';
import {ServerConfigService} from '../config/server-config.service';
import {Museum} from '../../models/Museum';
import {HttpClient} from '@angular/common/http';
import {BasicUserInfo} from '../../models/BasicUserInfo';
import {WikiEntry} from '../../models/WikiEntry';
import {WikiEntryService} from './wiki-entry.service';
import {ServerResponse} from '../user/ServerResponse';
import {Observable} from 'rxjs';
import {ProtoMuseum} from './ProtoMuseum';

@Injectable({
  providedIn: 'root'
})

export class MuseumService {

  private readonly url: string;

  constructor(private serverConfigService: ServerConfigService,
              private http: HttpClient) {
    this.url = serverConfigService.getServerConfig().getUrl();
  }

  public getMuseumList(): Observable<Museum[]> {
    return this.http.get<Museum[]>(this.url + 'museum-list');
  }

  public getMuseum(id: string): Observable<ProtoMuseum> {
    return this.http.get<ProtoMuseum>(this.url + 'museum/' + id);
  }

  public addMuseum(museum: WikiEntry, user: BasicUserInfo): Promise<ServerResponse> {
    return this.http.post<ServerResponse>(this.url + 'add-museum', {museum, user}).toPromise();
  }

  public updateMuseumInfo(museum: Museum, user: BasicUserInfo): Promise<any> {
    return this.http.put(this.url + 'museum-list/' + museum.id, {museum, user}, {}).toPromise();
  }

  public deleteMuseum(museumId: string, user: BasicUserInfo): Promise<any> {
    return this.http.delete(this.url + 'museum-list/' + museumId).toPromise();
  }
}
