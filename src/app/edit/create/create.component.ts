import {Component, OnInit, ViewChild} from '@angular/core';
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
import {BasicEntryBuilder} from '../../models/builders/basic-entry-builder';
import {WikiEntryBuilder} from '../../models/builders/wiki-entry-builder';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  category: string;
  museumId: string;

  @ViewChild(WikiEntryEditorComponent)
  wikiEntryEditor: WikiEntryEditorComponent;

  config: ProjectConfig;

  constructor(private route: ActivatedRoute,
              private museumService: MuseumService,
              private collectionService: CollectionService,
              private modalService: NgbModal,
              private projectConfigService: ProjectConfigService) {
    this.config = this.projectConfigService.getProjectConfig();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.category = params.get('category');

      if (this.category !== 'museum') {
        this.museumId = params.get('museumId');
      }
    });
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
    modalComponent.title = 'Create New ' + capitalizeFirstLetter(this.category);
    modalComponent.modal = modal;
    modalComponent.waitingForServerResponse();

    if (this.category === 'museum') {
      const newMuseum = Museum.of(this.wikiEntryEditor.getWikiEntry());
      if (this.config.isLogging()) {
        console.log(newMuseum);
      }
      this.processPromiseResponse(
        this.museumService.addMuseum(newMuseum),
        modalComponent,
      );
    } else if (this.category === 'collection') {
      const newCollection = new Collection(
        this.wikiEntryEditor.getWikiEntry(),
        new BasicEntry('', parseInt(this.museumId, 10))
      );
      if (this.config.isLogging()) {
        console.log(newCollection);
      }
      this.processPromiseResponse(
        this.collectionService.addCollection(newCollection),
        modalComponent,
      );
    } else if (this.category === 'artifact') {
      const newArtifact = undefined;
      if (this.config.isLogging()) {
        console.log(newArtifact);
      }
      // TODO: add artifact stuff here
    }
  }
}
