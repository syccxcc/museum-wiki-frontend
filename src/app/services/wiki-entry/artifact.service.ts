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


@Injectable({
  providedIn: 'root'
})
export class ArtifactService {

  private readonly url: string;
  private readonly projectConfig: ProjectConfig;

  constructor(private serverConfigService: ServerConfigService,
              private http: HttpClient,
              private userInfoService: UserInfoService,
              private projectConfigService: ProjectConfigService) {
    this.url = this.serverConfigService.getServerConfig().getUrl();
    this.projectConfig = projectConfigService.getProjectConfig();
  }

  public getArtifact(id: string | number): Observable<ProtoArtifact> {
    return this.http.get<ProtoArtifact>(this.url + 'artifact/' + id);
  }

  public deleteArtifact(id: string | number): Promise<ServerResponse> {
    return this.http.post<ServerResponse>(
      this.url + 'delete-artifact/' + id, {
        username: this.userInfoService.basicUserInfo.username,
        password: this.userInfoService.basicUserInfo.password,
      }).toPromise();
  }

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
