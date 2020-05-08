import {Injectable} from '@angular/core';
import {ProjectConfigService} from './project-config.service';
import {ServerConfig} from '../../config/ServerConfig';
import {ProjectConfig} from '../../config/ProjectConfig';

/**
 * Stores and provides configuration for the server
 */
@Injectable({
  providedIn: 'root'
})
export class ServerConfigService {

  /**
   * Server configuration
   */
  private readonly serverConfig: ServerConfig;

  /**
   * Constructor that creates server config based on project config
   *
   * @param projectConfigService Provides project configuration
   */
  constructor(private projectConfigService: ProjectConfigService) {
    this.serverConfig = new ServerConfig(projectConfigService.getProjectConfig());
  }

  /**
   * Returns current server configuration
   */
  public getServerConfig(): ServerConfig {
    return this.serverConfig;
  }
}
