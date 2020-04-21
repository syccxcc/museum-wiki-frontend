import {Injectable} from '@angular/core';
import {ServerConfigService} from '../config/server-config.service';
import {HttpClient} from '@angular/common/http';
import {Collection} from '../../models/Collection';
import {ServerConfig} from '../../config/ServerConfig';
import {ProtoCollection} from './ProtoCollection';
import {ServerResponse} from '../user/ServerResponse';
import {UserInfoService} from '../user/user-info.service';

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

  public getCollection(id: string): Promise<ProtoCollection> {
    return this.http
      .get<ProtoCollection>(this.serverConfig.getUrl() + 'collection/' + id)
      .toPromise();
  }

  public addCollection(collection: Collection): Promise<ServerResponse> {
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
