import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MuseumService} from '../../services/wiki-entry/museum.service';
import {Museum} from '../../models/museum';
import {WikiEntryEditorComponent} from '../wiki-entry-editor/wiki-entry-editor.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalMessageComponent} from '../../static/modal-message/modal-message.component';
import {ServerResponse} from '../../services/server-response';
import {HttpErrorResponse} from '@angular/common/http';
import {capitalizeFirstLetter} from '../../helper/capitalize-first-letter';
import {Collection} from '../../models/collection';
import {CollectionService} from '../../services/wiki-entry/collection.service';
import {BasicEntry} from '../../models/basic-entry';
import {ProjectConfigService} from '../../services/config/project-config.service';
import {ProjectConfig} from '../../config/ProjectConfig';
import {ArtifactBuilder} from '../../models/builders/artifact-builder';
import {BasicEntryBuilder} from '../../models/builders/basic-entry-builder';
import {ArtifactService} from '../../services/wiki-entry/artifact.service';
import {TagSelectionComponent} from '../tag-selection/tag-selection.component';
import {Mode} from '../mode';
import {Artifact} from '../../models/artifact';
import {MuseumBuilder} from '../../models/builders/museum-builder';
import {CollectionBuilder} from '../../models/builders/collection-builder';

/**
 * An editor that allows the user to edit information of an existing entry or a new entry.
 */
@Component({
  selector: 'app-edit-or-create',
  templateUrl: './edit-or-create.component.html',
  styleUrls: ['./edit-or-create.component.css']
})
export class EditOrCreateComponent implements OnInit {

  /**
   * Category of current object.
   */
  @Input() category: string;
  /**
   * If category is not museum, stores the id of the museum to which this entry belongs.
   */
  @Input() museumId: number | string;

  /**
   * The existing entry. Will be undefined if in create mode.
   */
  @Input() existingObject: Museum | Collection | Artifact;

  /**
   * The existing artifact.
   */
  existingArtifact: Artifact;

  /**
   * The current Mode.
   * Can either be edit or create.
   */
  @Input() mode: Mode;
  /**
   * Create mode. Used for comparisons in the HTML template.
   */
  createMode = Mode.CREATE;

  /**
   * Look into the form in the wiki entry editor
   */
  @ViewChild(WikiEntryEditorComponent)
  wikiEntryEditor: WikiEntryEditorComponent;

  /**
   * If category is artifact, need to see the selections in tag selection component
   */
  @ViewChild(TagSelectionComponent)
  tagSelection: TagSelectionComponent;

  /**
   * Project config which stores logging settings
   */
  config: ProjectConfig;

  /**
   * Constructor
   *
   * @param route The current Url
   * @param museumService Uploads the museum info
   * @param collectionService Uploads collection info
   * @param artifactService Uploads artifact info
   * @param modalService Opens new modal for user feedback
   * @param projectConfigService Stores logging configs
   * @param router Automatically routes user after successful edit/create
   */
  constructor(private route: ActivatedRoute,
              private museumService: MuseumService,
              private collectionService: CollectionService,
              private artifactService: ArtifactService,
              private modalService: NgbModal,
              private projectConfigService: ProjectConfigService,
              private router: Router) {
    this.config = this.projectConfigService.getProjectConfig();
  }

  /**
   * Log current status
   */
  ngOnInit(): void {
    if (this.config.isLogging()) {
      console.log(EditOrCreateComponent.name);
      console.log('Mode: ' + this.mode);
      console.log('Existing object:');
      console.log(this.existingObject);
    }

    if (this.mode === Mode.EDIT) {
      if (this.category === 'artifact') {
        this.existingArtifact = this.existingObject as Artifact;
      }
    }
  }

  private processPromiseResponse(promise: Promise<any>, modalComponent: any): void {
    promise.then((res: ServerResponse) => {
        if (this.config.isLogging()) {
          console.log(res);
        }
        modalComponent.fromServerResponse(res);
        if (res.success) {
          setTimeout(() => {
              this.router.navigateByUrl('/user-profile');
            },
            3000
          );
        }
      },
      (err: HttpErrorResponse) => {
        modalComponent.fromNetworkError(err);
        console.log(err);
      });
  }

  /**
   * Returns whether the current changes are valid and thus whether they can be submitted
   */
  canSubmit(): boolean {
    return this.wikiEntryEditor?.wikiEntryFormGroup?.valid
      && (this.category !== 'artifact' || this.tagSelection.getAllSelectedTags().length > 0);
  }

  /**
   * Submit current changes
   */
  public submit(): void {
    if (!this.canSubmit()) {
      return;
    }
    const modal = this.modalService.open(ModalMessageComponent);
    const modalComponent = modal.componentInstance;
    modalComponent.title = (this.mode === Mode.CREATE ? 'Create New ' : 'Edit ') + capitalizeFirstLetter(this.category);
    modalComponent.modal = modal;
    modalComponent.waitingForServerResponse();

    if (this.category === 'museum') {
      const newMuseum =
        new MuseumBuilder()
          .wikiEntry(this.wikiEntryEditor.getWikiEntry())
          .build();

      if (this.config.isLogging()) {
        console.log(newMuseum);
      }
      this.processPromiseResponse(
        this.museumService.addMuseum(newMuseum, this.mode),
        modalComponent,
      );
    } else if (this.category === 'collection') {
      const newCollection = new CollectionBuilder()
        .wikiEntry(this.wikiEntryEditor.getWikiEntry())
        .museum(new BasicEntry('', this.museumId))
        .build();
      if (this.config.isLogging()) {
        console.log(newCollection);
      }
      this.processPromiseResponse(
        this.collectionService.addCollection(newCollection, this.mode),
        modalComponent,
      );
    } else if (this.category === 'artifact') {
      const newArtifact =
        new ArtifactBuilder()
          .wikiEntry(this.wikiEntryEditor.getWikiEntry())
          .museum(new BasicEntryBuilder().id(this.museumId).build())
          .collectionList(this.tagSelection.getAllSelectedTags())
          .build();
      if (this.config.isLogging()) {
        console.log(this.tagSelection.getAllSelectedTags());
        console.log(newArtifact);
      }
      this.processPromiseResponse(
        this.artifactService.addArtifact(newArtifact, this.mode),
        modalComponent
      );
    }
  }
}
