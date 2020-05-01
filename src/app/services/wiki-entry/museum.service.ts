import {Injectable} from '@angular/core';
import {ServerConfigService} from '../config/server-config.service';
import {Museum} from '../../models/museum';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BasicUserInfo} from '../../models/basic-user-info';
import {WikiEntry} from '../../models/wiki-entry';
import {ServerResponse} from '../server-response';
import {Observable} from 'rxjs';
import {ProtoMuseum} from '../object-prototypes/proto-museum';
import {UserInfoService} from '../user/user-info.service';
import {Mode} from '../../edit/mode';

@Injectable({
  providedIn: 'root'
})

export class MuseumService {

  private readonly url: string;

  constructor(private serverConfigService: ServerConfigService,
              private http: HttpClient,
              private userInfo: UserInfoService) {
    this.url = serverConfigService.getServerConfig().getUrl();
  }

  public getMuseumList(): Observable<Museum[]> {
    return this.http.get<Museum[]>(this.url + 'museum-list');
  }

  public getMuseum(id: string | number): Observable<ProtoMuseum> {
    return this.http.get<ProtoMuseum>(this.url + 'museum/' + id);
  }

  public addMuseum(museum: WikiEntry, mode: Mode = Mode.CREATE): Promise<ServerResponse> {
    return this.http.post<ServerResponse>(this.url + 'add-museum', {museum, user: this.userInfo.basicUserInfo}).toPromise();
  }

  public updateMuseumInfo(museum: Museum): Promise<ServerResponse> {
    return this.http.put<ServerResponse>(
      this.url + 'museum-list/' + museum.id, {
      museum,
      user: this.userInfo.basicUserInfo
    }).toPromise();
  }

  public deleteMuseum(museumId: string | number): Promise<any> {
    const user = this.userInfo.basicUserInfo;
    return this.http
      .post(this.url + 'delete-museum/' + museumId, {
        username: user.username,
        password: user.password
      })
      .toPromise();
  }
}
