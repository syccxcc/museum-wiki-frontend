export class ProjectConfig {
  /**
   * true if project is not in deployment; always true because an actual server is never
   * used for this project
   */
  public static readonly testingMode = true;

  /**
   * set to true if debugging so that program activities are logged in console
   */
  public static readonly logInConsole = true;

  /**
   * set to true if no backend server is available; the program will use fake data
   * note that this only works for some pages
   */
  public static readonly useMockData = false;

  private static readonly config = new ProjectConfig(
    ProjectConfig.testingMode,
    ProjectConfig.logInConsole,
    ProjectConfig.useMockData);

  private readonly testing;
  private readonly log;
  private readonly mock;

  constructor(testing, log, mock) {
    this.testing = testing;
    this.log = log;
    this.mock = mock;
  }

  /**
   * static factory that returns the default project configuration
   */
  public static getInstance(): ProjectConfig {
    return this.config;
  }

  public isTesting(): boolean {
    return this.testing;
  }

  public isLogging(): boolean {
    return this.log;
  }

  public isUsingMockData(): boolean {
    return this.mock;
  }

}
