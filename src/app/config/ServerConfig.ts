import {ProjectConfig} from './ProjectConfig';

export class ServerConfig {
  private static deploymentServerUrl = '';
  private static localTestingServerUrl = '';

  public static getUrl() {
    if (ProjectConfig.isTesting()) {
      return this.localTestingServerUrl;
    }
    return this.deploymentServerUrl;
  }
}
