import {Injectable, Optional} from '@angular/core';
import {ProjectConfig} from '../../config/ProjectConfig';

/**
 * Creates project config based on preselected values
 */
@Injectable({
  providedIn: 'root'
})
export class ProjectConfigService {

  /**
   * The created project config
   */
  private readonly projectConfig: ProjectConfig;

  /**
   * Constructor
   *
   * @param projectConfig An existing project config to be used
   */
  constructor(@Optional() projectConfig?: ProjectConfig) {
    this.projectConfig = projectConfig ? projectConfig : ProjectConfig.getInstance();
  }

  /**
   * Retrieve the current project configuration
   */
  public getProjectConfig(): ProjectConfig {
    return this.projectConfig;
  }
}
