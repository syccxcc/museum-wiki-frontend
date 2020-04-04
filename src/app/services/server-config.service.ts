import {Injectable} from '@angular/core';
import {ProjectConfigService} from './project-config.service';
import {ServerConfig} from '../config/ServerConfig';

@Injectable({
  providedIn: 'root'
})
export class ServerConfigService {

  private readonly serverConfig: ServerConfig;

  constructor(private projectConfigService: ProjectConfigService) {
    this.serverConfig = new ServerConfig(projectConfigService.getProjectConfig());
  }

  public getServerConfig(): ServerConfig {
    return this.serverConfig;
  }
}
