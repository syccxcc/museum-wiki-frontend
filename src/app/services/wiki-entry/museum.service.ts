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

/**
 * Provides interfaces for CRUD museum information
 */
@Injectable({
  providedIn: 'root'
})
export class MuseumService {

  /**
   * Endpoint url
   */
  private readonly url: string;

  /**
   * Constructor
   *
   * @param serverConfigService Server config
   * @param http Makes http request
   * @param userInfo Information of logged in user
   */
  constructor(private serverConfigService: ServerConfigService,
              private http: HttpClient,
              private userInfo: UserInfoService) {
    this.url = serverConfigService.getServerConfig().getUrl();
  }

  /**
   * Get the list of all museums
   */
  public getMuseumList(): Observable<Museum[]> {
    return this.http.get<Museum[]>(this.url + 'museum-list');
  }

  /**
   * Get a particular museum
   *
   * @param id Id of museum
   */
  public getMuseum(id: string | number): Observable<ProtoMuseum> {
    return this.http.get<ProtoMuseum>(this.url + 'museum/' + id);
  }

  /**
   * Add/edit a museum
   *
   * @param museum Museum to be added
   * @param mode Whether museum should be created or edited
   */
  public addMuseum(museum: WikiEntry, mode: Mode = Mode.CREATE): Promise<ServerResponse> {
    return this.http.post<ServerResponse>(this.url + 'add-museum', {museum, user: this.userInfo.basicUserInfo}).toPromise();
  }

  /**
   * Delete a museum
   *
   * @param museumId Id of museum to be deleted
   */
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
