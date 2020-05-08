import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {WikiEntry} from '../../models/wiki-entry';
import {MuseumService} from '../../services/wiki-entry/museum.service';
import {ProtoMuseum} from '../../services/object-prototypes/proto-museum';
import {Museum} from '../../models/museum';
import {Collection} from '../../models/collection';
import {CollectionService} from '../../services/wiki-entry/collection.service';
import {ProtoCollection} from '../../services/object-prototypes/proto-collection';
import {BasicEntry} from '../../models/basic-entry';
import {Artifact} from '../../models/artifact';
import {HttpErrorResponse} from '@angular/common/http';
import {ProjectConfigService} from '../../services/config/project-config.service';
import {ProjectConfig} from '../../config/ProjectConfig';
import {ArtifactService} from '../../services/wiki-entry/artifact.service';
import {ProtoArtifact} from '../../services/object-prototypes/proto-artifact';
import {PrototypeBuilder} from '../../models/builders/prototype-builder';

/**
 * The view of a museum/collection/artifact.
 * Includes back buttons, entry info (name, image, intro, description), and a list of entries
 * belonging to this entry (e.g. collections belonging to the current museum)
 */
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  /**
   * The category of the current entry view
   */
  viewCategory: string;
  /**
   * Id of current item. Retrieved from url parameter
   */
  id: string;

  /**
   * Whether app is waiting for backend server response
   */
  loading: boolean;
  /**
   * Whether an error occurred while trying to get server response
   */
  error: boolean;

  /**
   * The content to be displayed
   */
  content: WikiEntry;
  /**
   * The museum being displayed
   * Undefined if category is not museum
   */
  private museum: Museum;
  /**
   * The collection currently displayed.
   * Undefined if category is not collection.
   */
  collection: Collection;
  /**
   * The artifact currently displayed.
   * Undefined if category is not artifact
   */
  artifact: Artifact;

  /**
   * Parents of the current content.
   * For example, store collections if current content is an artifact.
   */
  contentParents: BasicEntry[];
  /**
   * Name of the parent.
   */
  parentName: string;

  /**
   * List of entries belonging to the current entry.
   */
  contentSubList: WikiEntry[];
  /**
   * Category of entries belonging to the current entry.
   */
  subListName: string;
  /**
   * Name of the sublist
   */
  private readonly subListNameReference = {museum: 'Collection', collection: 'Artifact'};
  /**
   * Name of the parent
   */
  private readonly parentNameReference = {collection: 'museum', artifact: 'collection'};

  /**
   * Project configuration which stores logging settings.
   */
  config: ProjectConfig;

  /**
   * Reset the status of the app to loading
   */
  private resetLoadingStatus(): void {
    this.loading = true;
    this.error = false;
  }

  /**
   * Starts retrieving information from the server based on analyzed url.
   *
   * @param route Current url
   * @param router Navigates based on user click
   * @param museumService Get museum
   * @param collectionService Get collection
   * @param artifactService Get artifact
   * @param projectConfigService Project config about logging
   */
  constructor(private route: ActivatedRoute,
              private router: Router,
              private museumService: MuseumService,
              private collectionService: CollectionService,
              private artifactService: ArtifactService,
              private projectConfigService: ProjectConfigService) {
    this.resetLoadingStatus();

    this.config = this.projectConfigService.getProjectConfig();

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.viewCategory = paramMap.get('viewCategory');
      this.id = paramMap.get('id');
      this.resetLoadingStatus();
      this.subListName = this.subListNameReference[this.viewCategory];
      this.parentName = this.parentNameReference[this.viewCategory];

      if (this.viewCategory === 'museum') {
        this.museumService.getMuseum(this.id).subscribe(
          (response: ProtoMuseum) => {
            if (this.config?.isLogging()) {
              console.log(response);
            }
            this.museum = Museum.of(response.museum);
            this.content = this.museum;
            this.contentSubList = response.collectionList;
            this.loading = false;
          },
          (error: HttpErrorResponse) => {
            this.error = true;
            console.log(error);
          });
      } else if (this.viewCategory === 'collection') {
        this.collectionService.getCollection(this.id).subscribe(
          (res: ProtoCollection) => {
            if (this.config?.isLogging()) {
              console.log(res);
            }
            const collection = PrototypeBuilder.buildFromPrototype({collection: res}) as Collection;
            this.content = collection;
            this.collection = collection;
            this.contentSubList = collection.artifacts;
            this.contentParents = [collection.museum];
            this.loading = false;
          },
          (error: HttpErrorResponse) => {
            this.error = true;
            console.log(error);
          }
        );
      } else if (this.viewCategory === 'artifact') {
        this.artifactService.getArtifact(this.id).subscribe((res: ProtoArtifact) => {
            if (this.config?.isLogging()) {
              console.log(res);
            }
            const artifact = PrototypeBuilder.buildFromPrototype({artifact: res}) as Artifact;
            this.content = artifact;
            this.artifact = artifact;
            this.contentSubList = [];
            this.contentParents = artifact.collectionList;
            this.loading = false;
          },
          (error: HttpErrorResponse) => {
            this.error = true;
            console.log(error);
          });
      }
    });
  }

  /**
   * Everything is in constructor. No need for anything currently.
   */
  ngOnInit(): void {
  }

  /**
   * Navigate back to the parent.
   *
   * @param entry The target entry
   */
  goToParent(entry: BasicEntry): void {
    this.router.navigateByUrl('/view/' + this.parentName + '/' + entry.id);
  }

}
