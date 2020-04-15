import {Injectable} from '@angular/core';
import {ProjectConfig} from '../../config/ProjectConfig';

@Injectable({
  providedIn: 'root'
})
export class ProjectConfigService {

  private readonly projectConfig: ProjectConfig;

  constructor() {
    this.projectConfig = ProjectConfig.getInstance();
  }

  public getProjectConfig(): ProjectConfig {
    return this.projectConfig;
  }
}
