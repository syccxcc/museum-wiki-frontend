import {ProjectConfig} from './ProjectConfig';

/**
 * Configuration for the url of the backend server
 */
export class ServerConfig {
  /**
   * Url for actual web server; is never used because project is not deployed
   */
  public static readonly deploymentServerUrl = '';

  /**
   * Url for getting data when testing locally against the cpp backend
   */
  public static readonly localCppTestingServerUrl = 'http://localhost:5300/request/';

  /**
   * The backend url that is currently in use
   */
  private readonly activeUrl: string;

  /**
   * Determines server information based on project configuration
   *
   * @param projectConfig Project configuration, which includes which url the
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
   * Retrieve the currently used url according to the current config
   */
  public getUrl(): string {
    return this.activeUrl;
  }
}
