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

  public register(user: User): Promise<ServerResponse> {
    return this.http.post<ServerResponse>(this.url + 'user', user).toPromise();
  }

  public login(userCredentials: BasicUserInfo): Promise<ServerResponse> {
    return this.http
      .put<ServerResponse>(this.url + 'login/' + userCredentials.username,
        {username: userCredentials.username, password: userCredentials.password})
      .toPromise();
  }

  public getCompleteUserInfo(userCredentials: BasicUserInfo): Promise<User> {
    return this.http.put<User>(this.url + 'user/' + userCredentials.username, {
      username: userCredentials.username,
      password: userCredentials.password
    }).toPromise();
  }
}
