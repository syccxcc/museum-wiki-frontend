/**
 * Top-level configurations for the project.
 */
export class ProjectConfig {
  /**
   * true if project is not in deployment; always true because an actual server is never
   * used for this project
   */
  public static readonly testingMode = true;

  /**
   * set to true if debugging so that program activities are logged in console
   */
  public static readonly logInConsole = false;

  /**
   * set to true if no backend server is available; the program will use fake data
   * note that this only works for some pages
   */
  public static readonly useMockData = false;

  /**
   * An instance of project config based on the settings configured above.
   */
  private static readonly config = new ProjectConfig(
    ProjectConfig.testingMode,
    ProjectConfig.logInConsole,
    ProjectConfig.useMockData);

  /**
   * Whether the program is in testing mode
   */
  private readonly testing;
  /**
   * Whether the program should log its activities in the console
   */
  private readonly log;
  /**
   * Whether program should use mock data instead of actual data from backend
   */
  private readonly mock;

  /**
   * Creates a project config object based on provided configurations
   *
   * @param testing Whether the program is test
   * @param log Whether the program should log its activities in the console
   * @param mock Whether program should use mock data instead of actual data from backend
   */
  constructor(testing, log, mock) {
    this.testing = testing;
    this.log = log;
    this.mock = mock;
  }

  /**
   * Static factory that returns the default project configuration
   */
  public static getInstance(): ProjectConfig {
    return this.config;
  }

  /**
   * Whether the program is in testing mode
   */
  public isTesting(): boolean {
    return this.testing;
  }

  /**
   * Whether the program should log its activities in the console
   */
  public isLogging(): boolean {
    return this.log;
  }

  /**
   * Whether program should use mock data instead of actual data from backend
   */
  public isUsingMockData(): boolean {
    return this.mock;
  }

}
