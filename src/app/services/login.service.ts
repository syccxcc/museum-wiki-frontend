import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BasicUserInfo} from '../models/BasicUserInfo';
import {ServerConfigService} from './config/server-config.service';
import {ServerResponse} from './user/ServerResponse';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string;

  constructor(private http: HttpClient,
              private serverConfig: ServerConfigService) {
    this.url = serverConfig.getServerConfig().getUrl();
  }

  public login(userCredentials: BasicUserInfo): Promise<ServerResponse> {
    return this.http
      .put<ServerResponse>(this.url + 'user/' + userCredentials.username,
        {username: userCredentials.username, password: userCredentials.password})
      .toPromise();
  }

  public getCompleteUserInfo(userCredentials: BasicUserInfo): Promise<User> {
    // FIXME: differentiate between get info and login
    return this.http.post<User>(this.url + 'user/' + userCredentials.username, {
      username: userCredentials.username,
      password: userCredentials.password
    }).toPromise();
  }
}
