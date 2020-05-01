export class ProjectConfig {
  public static readonly testingMode = true;
  public static readonly logInConsole = true;
  public static readonly useMockData = true;

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
