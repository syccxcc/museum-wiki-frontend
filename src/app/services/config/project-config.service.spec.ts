import {TestBed} from '@angular/core/testing';

import {ProjectConfigService} from './project-config.service';
import {ProjectConfig} from '../../config/ProjectConfig';

describe('ProjectConfigService', () => {
  let service: ProjectConfigService;

  beforeEach(() => {
    service = new ProjectConfigService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have identical configuration values with Config class', () => {
    expect(service.getProjectConfig().isTesting()).toBe(ProjectConfig.testingMode);
  });
});
