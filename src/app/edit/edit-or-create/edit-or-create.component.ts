import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
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
import {WikiEntry} from '../../models/wiki-entry';
import {TagSelectionComponent} from '../tag-selection/tag-selection.component';
import {Mode} from '../mode';
import {Artifact} from '../../models/artifact';
import {MuseumBuilder} from '../../models/builders/museum-builder';
import {CollectionBuilder} from '../../models/builders/collection-builder';

@Component({
  selector: 'app-edit-or-create',
  templateUrl: './edit-or-create.component.html',
  styleUrls: ['./edit-or-create.component.css']
})
export class EditOrCreateComponent implements OnInit {

  @Input() category: string;
  @Input() museumId: number;

  @Input() existingObject: Museum | Collection | Artifact;

  existingMuseum: Museum;
  existingCollection: Collection;
  existingArtifact: Artifact;

  @Input() collectionList: WikiEntry[];

  @Input() mode: Mode;

  @ViewChild(WikiEntryEditorComponent)
  wikiEntryEditor: WikiEntryEditorComponent;

  @ViewChild(TagSelectionComponent)
  tagSelection: TagSelectionComponent;

  config: ProjectConfig;

  constructor(private route: ActivatedRoute,
              private museumService: MuseumService,
              private collectionService: CollectionService,
              private artifactService: ArtifactService,
              private modalService: NgbModal,
              private projectConfigService: ProjectConfigService) {
    this.config = this.projectConfigService.getProjectConfig();
  }

  ngOnInit(): void {
    if (this.category === 'museum') {
      this.existingMuseum = this.existingObject as Museum;
    } else if (this.category === 'collection') {
      this.existingCollection = this.existingObject as Collection;
    } else if (this.category === 'artifact') {
      this.existingArtifact = this.existingObject as Artifact;
    }
  }

  private processPromiseResponse(promise: Promise<any>, modalComponent: any): void {
    promise.then((res: ServerResponse) => {
        if (this.config.isLogging()) {
          console.log(res);
        }
        modalComponent.fromServerResponse(res);
      },
      (err: HttpErrorResponse) => {
        modalComponent.fromNetworkError(err);
        console.log(err);
      });
  }

  public submit(): void {
    if (!this.wikiEntryEditor.wikiEntryFormGroup.valid) {
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
