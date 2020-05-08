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

/**
 * Provides interfaces for CRUD collection information
 */
@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  /**
   * Stores endpoint url
   */
  private readonly serverConfig: ServerConfig;

  /**
   * Constructor
   *
   * @param serverConfigService Server endpoint url
   * @param http Http GET/PUT/POST/DELETE apis
   * @param userInfoService Gets user info
   */
  constructor(private serverConfigService: ServerConfigService,
              private http: HttpClient,
              private userInfoService: UserInfoService) {
    this.serverConfig = serverConfigService.getServerConfig();
  }

  /**
   * Get a collection
   *
   * @param id Id of collection
   */
  public getCollection(id: string | number): Observable<ProtoCollection> {
    return this.http
      .get<ProtoCollection>(this.serverConfig.getUrl() + 'collection/' + id);
  }

  /**
   * Add/edit a collection
   *
   * @param collection Collection to be added/edited
   * @param mode Whether user is creating or editing the collection
   */
  public addCollection(collection: Collection, mode: Mode = Mode.CREATE): Promise<ServerResponse> {
    return this.http
      .post<ServerResponse>(
        this.serverConfig.getUrl() + (mode === Mode.CREATE ? 'add-collection' : 'edit-collection'),
        {
          museum: {id: collection.museum.id},
          collection,
          user: this.userInfoService.basicUserInfo
        })
      .toPromise();
  }
}
