export class ProjectConfig {
  public static readonly testingMode = true;
  public static readonly logInConsole = true;

  private static readonly config: ProjectConfig = new ProjectConfig(ProjectConfig.testingMode, ProjectConfig.logInConsole);

  private readonly testing;
  private readonly log;

  constructor(testing, log) {
    this.testing = testing;
    this.log = log;
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

}
