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

/**
 * Get an entry by its category
 */
@Injectable({
  providedIn: 'root'
})
export class GetByCategoryService {

  /**
   * Constructor
   *
   * @param museumService Gets museum
   * @param collectionService Gets collection
   * @param artifactService Gets artifact
   */
  constructor(private museumService: MuseumService,
              private collectionService: CollectionService,
              private artifactService: ArtifactService) {
  }

  /**
   * Get an entry by its category and id
   *
   * @param category Can be museum, collection, or artifact
   * @param id Id of entry
   */
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
