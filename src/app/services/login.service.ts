import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BasicUserInfo} from '../models/BasicUserInfo';
import {ServerConfigService} from './server-config.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string;

  constructor(private http: HttpClient,
              private serverConfig: ServerConfigService) {
    this.url = serverConfig.getServerConfig().getUrl();
  }

  public login(userCredentials: BasicUserInfo): Promise<any> {
    return this.http.get(this.url + '/user/', {}).toPromise();
  }
}
