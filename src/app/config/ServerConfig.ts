import {ProjectConfig} from './ProjectConfig';

export class ServerConfig {
  public static readonly deploymentServerUrl = '';
  public static readonly localCppTestingServerUrl = 'http://localhost:5300/request/';

  private readonly activeUrl: string;

  constructor(private projectConfig: ProjectConfig) {
    if (projectConfig.isTesting()) {
      this.activeUrl = ServerConfig.localCppTestingServerUrl;
    } else {
      this.activeUrl = ServerConfig.deploymentServerUrl;
    }
  }

  public getUrl(): string {
    return this.activeUrl;
  }
}
