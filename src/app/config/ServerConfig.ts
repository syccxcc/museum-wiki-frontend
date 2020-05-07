import {ProjectConfig} from './ProjectConfig';

/**
 * configuration for the url of the backend server
 */
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
   * the backend url that is currently in use
   */
  private readonly activeUrl: string;

  /**
   * determines server information based on project configuration
   *
   * @param projectConfig project configuration, which includes which url the
   * server should use
   */
  constructor(private projectConfig: ProjectConfig) {
    // choose the appropriate url based on project configuration
    if (projectConfig.isTesting()) {
      this.activeUrl = ServerConfig.localCppTestingServerUrl;
    } else {
      this.activeUrl = ServerConfig.deploymentServerUrl;
    }
  }

  /**
   * retrieve the currently used url according to the current config
   */
  public getUrl(): string {
    return this.activeUrl;
  }
}
