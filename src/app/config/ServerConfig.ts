import {ProjectConfig} from './ProjectConfig';

export class ServerConfig {
  private static readonly deploymentServerUrl = '';
  private static readonly localInRamTestingServerUrl = 'api/';
  private static readonly localCppTestingServerUrl = 'http://localhost:5300/get-data/';

  private readonly activeUrl: string;

  constructor(private projectConfig: ProjectConfig) {
    if (projectConfig.isTesting()) {
      if (projectConfig.isUsingInRamServer()) {
        this.activeUrl = ServerConfig.localInRamTestingServerUrl;
      } else {
        this.activeUrl = ServerConfig.localCppTestingServerUrl;
      }
    } else {
      this.activeUrl = ServerConfig.deploymentServerUrl;
    }
  }

  public getUrl(): string {
    return this.activeUrl;
  }
}
