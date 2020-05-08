import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BasicUserInfo} from '../../models/basic-user-info';
import {ServerConfigService} from '../config/server-config.service';
import {ServerResponse} from '../server-response';
import {User} from '../../models/user';
import {ProtoUser} from '../object-prototypes/proto-user';
import {Observable} from 'rxjs';

/**
 * Http service for logging in, logging out, and user-profile related actions.
 * Should not be used directly for login. Use UserInfoService instead.
 */
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  /**
   * Endpoint url
   */
  private readonly url: string;

  /**
   * Constructor
   *
   * @param http Http client
   * @param serverConfig Server configuration for endpoint url
   */
  constructor(private http: HttpClient,
              private serverConfig: ServerConfigService) {
    this.url = serverConfig.getServerConfig().getUrl();
  }

  /**
   * Register a user
   *
   * @param user Information of a user to be registered
   */
  public register(user: User): Promise<ServerResponse> {
    return this.http.post<ServerResponse>(this.url + 'register', user).toPromise();
  }

  /**
   * Attempt to login
   *
   * @param userCredentials Credentials for an attempted user login
   */
  public login(userCredentials: BasicUserInfo): Promise<ServerResponse> {
    return this.http
      .post<ServerResponse>(this.url + 'login',
        {username: userCredentials.username, password: userCredentials.password})
      .toPromise();
  }

  /**
   * Retrieve the complete profile of a user
   *
   * @param userCredentials Login credentials for the user
   */
  public getCompleteUserInfo(userCredentials: BasicUserInfo): Observable<ProtoUser> {
    return this.http.post<ProtoUser>(this.url + 'user-profile', {
      username: userCredentials.username,
      password: userCredentials.password
    });
  }

  /**
   * Reset the password of a user
   *
   * @param username The username of the account
   */
  public resetPassword(username: string): Promise<ServerResponse> {
    return this.http.post<ServerResponse>(this.url + 'reset-password', {username}).toPromise();
  }

}
