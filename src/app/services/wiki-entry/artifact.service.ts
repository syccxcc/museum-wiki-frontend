import {Injectable} from '@angular/core';
import {ServerConfigService} from '../config/server-config.service';
import {Observable} from 'rxjs';
import {ProtoArtifact} from '../object-prototypes/proto-artifact';
import {HttpClient} from '@angular/common/http';
import {Artifact} from '../../models/artifact';
import {UserInfoService} from '../user/user-info.service';
import {ServerResponse} from '../server-response';
import {Mode} from '../../edit/mode';


@Injectable({
  providedIn: 'root'
})
export class ArtifactService {

  private readonly url: string;

  constructor(private serverConfigService: ServerConfigService,
              private http: HttpClient,
              private userInfoService: UserInfoService) {
    this.url = this.serverConfigService.getServerConfig().getUrl();
  }

  public getArtifact(id: string | number): Observable<ProtoArtifact> {
    return this.http.get<ProtoArtifact>(this.url + 'artifact/' + id);
  }

  public addArtifact(artifact: Artifact, mode: Mode = Mode.CREATE): Promise<ServerResponse> {
    return this.http.post<ServerResponse>(
      this.url + (mode === Mode.CREATE ? 'add-artifact' : 'edit-artifact'),
      {
        museum: {id: artifact.museum.id},
        collection: artifact.collectionList.map((collection) => collection.id),
        artifact,
        user: this.userInfoService.basicUserInfo
      }).toPromise();
  }
}
