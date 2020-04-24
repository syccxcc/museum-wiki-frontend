import {TestBed} from '@angular/core/testing';

import {ServerConfigService} from './server-config.service';
import {ServerConfig} from '../../config/ServerConfig';
import {ProjectConfig} from '../../config/ProjectConfig';
import {ProjectConfigService} from './project-config.service';

describe('ServerConfigService', () => {

  function createService(testing: boolean): ServerConfigService {
    const projectConfigService = new ProjectConfigService(new ProjectConfig(testing, false));
    return new ServerConfigService(projectConfigService);
  }

  it('should be created', () => {
    expect(createService(true)).toBeTruthy();
  });

  it('should have same url according to configuration', () => {
    let service = createService(true);
    expect(service.getServerConfig().getUrl()).toBe(ServerConfig.localCppTestingServerUrl);
    service = createService(false);
    expect(service.getServerConfig().getUrl()).toBe(ServerConfig.deploymentServerUrl);
  });
});
