import {Injectable, Optional} from '@angular/core';
import {ProjectConfig} from '../../config/ProjectConfig';

@Injectable({
  providedIn: 'root'
})
export class ProjectConfigService {

  private readonly projectConfig: ProjectConfig;

  constructor(@Optional() projectConfig?: ProjectConfig) {
    this.projectConfig = projectConfig ? projectConfig : ProjectConfig.getInstance();
  }

  public getProjectConfig(): ProjectConfig {
    return this.projectConfig;
  }
}
