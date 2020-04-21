export class ProjectConfig {
  public static readonly testingMode = true;

  private static readonly config: ProjectConfig = new ProjectConfig(ProjectConfig.testingMode);

  private readonly testing;

  constructor(testing) {
    this.testing = testing;
  }

  public static getInstance(): ProjectConfig {
    return this.config;
  }

  public isTesting(): boolean {
    return this.testing;
  }

}
