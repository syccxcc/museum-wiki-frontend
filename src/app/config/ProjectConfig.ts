export class ProjectConfig {
  private static readonly testingMode = true;
  private static readonly usingInRamServerForHttp = false;

  private static readonly config: ProjectConfig = new ProjectConfig(ProjectConfig.testingMode, ProjectConfig.usingInRamServerForHttp);

  private readonly testing;
  private readonly usingInRamServer;

  constructor(testing, usingInRamServer) {
    this.testing = testing;
    this.usingInRamServer = usingInRamServer;
  }

  public static getInstance(): ProjectConfig {
    return this.config;
  }

  public isTesting(): boolean {
    return this.testing;
  }

  public isUsingInRamServer(): boolean {
    return this.usingInRamServer;
  }
}
