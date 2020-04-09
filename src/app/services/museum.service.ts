import {Injectable} from '@angular/core';
import {ServerConfigService} from './server-config.service';
import {Museum} from '../models/Museum';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BasicUserInfo} from '../models/BasicUserInfo';

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

  public getMuseum(id: string): Promise<Museum> {
    return this.http.get<Museum>(this.url + 'museum/' + id + '/').toPromise();
  }

  public addMuseum(museum: Museum, user: BasicUserInfo): Promise<any> {
    return this.http.put(this.url + 'museum-list/', {museum, user}, {}).toPromise();
  }

  public updateMuseumInfo(museum: Museum, user: BasicUserInfo): Promise<any> {
    return this.http.post(this.url + 'museum-list/' + museum.id + '/', {museum, user}, {}).toPromise();
  }

  public deleteMuseum(museumId: string, user: BasicUserInfo): Promise<any> {
    return this.http.delete(this.url + 'museum-list/' + museumId + '/', {}).toPromise();
  }
}
