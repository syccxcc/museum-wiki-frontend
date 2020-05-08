import {Injectable} from '@angular/core';
import {ServerConfigService} from '../config/server-config.service';
import {Observable} from 'rxjs';
import {ProtoArtifact} from '../object-prototypes/proto-artifact';
import {HttpClient} from '@angular/common/http';
import {Artifact} from '../../models/artifact';
import {UserInfoService} from '../user/user-info.service';
import {ServerResponse} from '../server-response';
import {Mode} from '../../edit/mode';
import {ProjectConfigService} from '../config/project-config.service';
import {ProjectConfig} from '../../config/ProjectConfig';

/**
 * Provides interfaces for CRUD artifact information
 */
@Injectable({
  providedIn: 'root'
})
export class ArtifactService {

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
   * @param serverConfigService Endpoint url
   * @param http Provides http GET/PUT/POST/DELETE apis
   * @param userInfoService Provides user info
   * @param projectConfigService Whether logging is turned on
   */
  constructor(private serverConfigService: ServerConfigService,
              private http: HttpClient,
              private userInfoService: UserInfoService,
              private projectConfigService: ProjectConfigService) {
    this.url = this.serverConfigService.getServerConfig().getUrl();
    this.projectConfig = projectConfigService.getProjectConfig();
  }

  /**
   * Get an artifact
   *
   * @param id Id of artifact
   */
  public getArtifact(id: string | number): Observable<ProtoArtifact> {
    return this.http.get<ProtoArtifact>(this.url + 'artifact/' + id);
  }

  /**
   * Delete an artifact
   *
   * @param id Id of artifact
   */
  public deleteArtifact(id: string | number): Promise<ServerResponse> {
    return this.http.post<ServerResponse>(
      this.url + 'delete-artifact/' + id, {
        username: this.userInfoService.basicUserInfo.username,
        password: this.userInfoService.basicUserInfo.password,
      }).toPromise();
  }

  /**
   * Add/edit an artifact
   *
   * @param artifact Artifact to be added/edited
   * @param mode Whether the artifact will be created or edited
   */
  public addArtifact(artifact: Artifact, mode: Mode = Mode.CREATE): Promise<ServerResponse> {
    const url = this.url + (mode === Mode.CREATE ? 'add-artifact' : 'edit-artifact');
    const body = {
      museum: {id: artifact.museum.id},
      collection: artifact.collectionList.map((collection) => collection.id),
      artifact,
      user: this.userInfoService.basicUserInfo
    };
    if (this.projectConfig.isLogging()) {
      console.log('Add artifact request url:');
      console.log(url);
      console.log('Add artifact request body:');
      console.log(body);
    }
    return this.http.post<ServerResponse>(
      url,
      body).toPromise();
  }
}
