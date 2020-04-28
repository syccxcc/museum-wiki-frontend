import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MuseumService} from './wiki-entry/museum.service';
import {CollectionService} from './wiki-entry/collection.service';
import {ArtifactService} from './wiki-entry/artifact.service';
import {Observable} from 'rxjs';
import {ProtoMuseum} from './object-prototypes/proto-museum';
import {ProtoArtifact} from './object-prototypes/proto-artifact';
import {ProtoCollection} from './object-prototypes/proto-collection';
import {ServerConfigService} from './config/server-config.service';

@Injectable({
  providedIn: 'root'
})
export class GetByCategoryService {

  private readonly url: string;

  constructor(private http: HttpClient,
              private serverConfigService: ServerConfigService,
              private museumService: MuseumService,
              private collectionService: CollectionService,
              private artifactService: ArtifactService) {
    this.url = serverConfigService.getServerConfig().getUrl();
  }

  public getByCategoryAndId(category: string, id: number | string): Observable<ProtoMuseum | ProtoArtifact | ProtoCollection> {
    if (category === 'museum') {
      return this.museumService.getMuseum(id);
    } else if (category === 'collection') {
      return this.collectionService.getCollection(id);
    } else if (category === 'artifact') {
      return this.artifactService.getArtifact(id);
    }
  }

}
