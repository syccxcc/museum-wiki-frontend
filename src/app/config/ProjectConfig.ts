import {templateVisitAll} from '@angular/compiler';

export class ProjectConfig {
  private testing = true;

  public isTesting(): boolean {
    return this.testing;
  }
}
