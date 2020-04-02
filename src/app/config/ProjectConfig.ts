import {templateVisitAll} from '@angular/compiler';

export class ProjectConfig {
  private static testing = true;

  public static isTesting(): boolean {
    return ProjectConfig.testing;
  }
}
