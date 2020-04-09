export class ProjectConfig {
  private readonly testing = true;
  private readonly usingInRamServer = true;

  public isTesting(): boolean {
    return this.testing;
  }

  public isUsingInRamServer(): boolean {
    return this.usingInRamServer;
  }
}
