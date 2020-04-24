import {Injectable} from '@angular/core';
import {ServerConfigService} from '../config/server-config.service';
import {Observable} from 'rxjs';
import {ProtoArtifact} from '../object-prototypes/proto-artifact';
import {HttpClient} from '@angular/common/http';
import {Artifact} from '../../models/artifact';
import {UserInfoService} from '../user/user-info.service';
import {ServerResponse} from '../server-response';


@Injectable({
  providedIn: 'root'
})
export class ArtifactService {

  private url: string;

  constructor(private serverConfigService: ServerConfigService,
              private http: HttpClient,
              private userInfoService: UserInfoService) {
    this.url = this.serverConfigService.getServerConfig().getUrl();
  }

  public getArtifact(id: string): Observable<ProtoArtifact> {
    return this.http.get<ProtoArtifact>(this.url + 'artifact/' + id);
  }

  public addArtifact(artifact: Artifact): Promise<ServerResponse> {
    return this.http.post<ServerResponse>(
      this.url + 'add-artifact',
      {
        collection: artifact.collection.id,
        artifact,
        user: this.userInfoService.basicUserInfo
      }).toPromise();
  }
}
