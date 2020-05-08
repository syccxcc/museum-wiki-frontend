import {Injectable} from '@angular/core';
import {UserInfoService} from './user/user-info.service';
import {Observable} from 'rxjs';
import {ProtoEdit} from './object-prototypes/proto-edit';
import {ServerResponse} from './server-response';
import {HttpClient} from '@angular/common/http';
import {ServerConfigService} from './config/server-config.service';
import {ProjectConfigService} from './config/project-config.service';
import {ProjectConfig} from '../config/ProjectConfig';
import {ProtoArtifact} from './object-prototypes/proto-artifact';
import {Mocker} from './mocker';
import {Mock} from 'protractor/built/driverProviders';
import {Edit} from '../models/edit';

/**
 * Edit related server interactions
 */
@Injectable({
  providedIn: 'root'
})
export class EditService {

  /**
   * Server endpoint url
   */
  private readonly url: string;

  /**
   * Project configuration
   */
  private readonly projectConfig: ProjectConfig;

  /**
   * Constructor
   *
   * @param http Http request api
   * @param serverConfigService Server configuration
   * @param userInfoService User information
   * @param projectConfigService Project configuration
   */
  constructor(private http: HttpClient,
              private serverConfigService: ServerConfigService,
              private userInfoService: UserInfoService,
              private projectConfigService: ProjectConfigService) {
    this.url = serverConfigService.getServerConfig().getUrl();
    this.projectConfig = projectConfigService.getProjectConfig();
  }

  /**
   * Review an edit
   *
   * @param edit The edit to be reviewed
   * @param action True if edit is approved; false otherwise
   */
  reviewEdit(edit: Edit, action: boolean): Promise<ServerResponse> {
    return this.http.post<ServerResponse>(this.url + 'review-edit', {
      user: this.userInfoService.basicUserInfo,
      editId: edit.id,
      category: edit.category,
      type: edit.type,
      action
    }).toPromise();
  }

  /**
   * Get detailed information of an edit
   *
   * @param id Id of edit
   */
  getEdit(id: number | string): Observable<ProtoEdit> {
    if (this.projectConfig.isUsingMockData()) {
      return new Observable<ProtoEdit>((observer) => {
        const protoEdit = Mocker.mockProtoEdit();
        protoEdit.category = 'artifact';
        protoEdit.artifact = Mocker.mockProtoArtifact();
        observer.next(protoEdit);
      });
    } else {
      return this.http.get<ProtoEdit>(this.url + 'edit/' + id);
    }
  }
}
