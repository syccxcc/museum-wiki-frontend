import {ProjectConfig} from './ProjectConfig';

export class ServerConfig {
  /**
   * url for actual web server; is never used because project is not deployed
   */
  public static readonly deploymentServerUrl = '';

  /**
   * url for getting data when testing locally against the cpp backend
   */
  public static readonly localCppTestingServerUrl = 'http://localhost:5300/request/';

  /**
   * the url that is currently in use
   */
  private readonly activeUrl: string;

  constructor(private projectConfig: ProjectConfig) {
    // choose the appropriate url based on project configuration
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
