import {Injectable} from '@angular/core';
import {ServerConfigService} from '../config/server-config.service';
import {HttpClient} from '@angular/common/http';
import {Collection} from '../../models/collection';
import {ServerConfig} from '../../config/ServerConfig';
import {ProtoCollection} from '../object-prototypes/proto-collection';
import {ServerResponse} from '../server-response';
import {UserInfoService} from '../user/user-info.service';
import {Observable} from 'rxjs';
import {Mode} from '../../edit/mode';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  private serverConfig: ServerConfig;

  constructor(private serverConfigService: ServerConfigService,
              private http: HttpClient,
              private userInfoService: UserInfoService) {
    this.serverConfig = serverConfigService.getServerConfig();
  }

  public getCollection(id: string): Observable<ProtoCollection> {
    return this.http
      .get<ProtoCollection>(this.serverConfig.getUrl() + 'collection/' + id);
  }

  public addCollection(collection: Collection, mode: Mode = Mode.CREATE): Promise<ServerResponse> {
    return this.http
      .post<ServerResponse>(
        this.serverConfig.getUrl() + 'add-collection',
        {
          museum: {id: collection.museum.id},
          collection,
          user: this.userInfoService.basicUserInfo
        })
      .toPromise();
  }
}
