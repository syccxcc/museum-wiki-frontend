import {ProjectConfigService} from '../services/project-config.service';
import {ProjectConfig} from './ProjectConfig';

export class ServerConfig {
  readonly static deploymentServerUrl = '';
  readonly static localTestingServerUrl = '';

  readonly activeUrl;

  constructor(private projectConfig: ProjectConfig) {
    if (projectConfig.isTesting()) {
      this.activeUrl = ServerConfig.localTestingServerUrl;
    } else {
      this.activeUrl = ServerConfig.deploymentServerUrl;
    }
  }

  public getUrl() {
    return this.activeUrl;
  }
}
