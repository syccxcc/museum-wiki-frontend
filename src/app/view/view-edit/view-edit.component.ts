import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Museum} from '../../models/museum';
import {Collection} from '../../models/collection';
import {Artifact} from '../../models/artifact';
import {EditService} from '../../services/edit.service';
import {Edit} from '../../models/edit';
import {ProtoEdit} from '../../services/object-prototypes/proto-edit';
import {HttpErrorResponse} from '@angular/common/http';
import {capitalizeFirstLetter} from '../../helper/capitalize-first-letter';
import {UserInfoService} from '../../services/user/user-info.service';
import {GetByCategoryService} from '../../services/get-by-category.service';
import {ProtoMuseum} from '../../services/object-prototypes/proto-museum';
import {ProtoArtifact} from '../../services/object-prototypes/proto-artifact';
import {ProtoCollection} from '../../services/object-prototypes/proto-collection';
import {PrototypeBuilder} from '../../models/builders/prototype-builder';
import {ProjectConfigService} from '../../services/config/project-config.service';
import {Projects} from '@angular/cli/lib/config/schema';
import {ProjectConfig} from '../../config/ProjectConfig';
import {ModalMessageComponent} from '../../static/modal-message/modal-message.component';
import {ServerResponse} from '../../services/server-response';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-edit',
  templateUrl: './view-edit.component.html',
  styleUrls: ['./view-edit.component.css']
})
export class ViewEditComponent implements OnInit {

  editId: string;
  category: string;
  type: string;

  edit: Edit;

  currentEntry: Museum | Collection | Artifact;
  changedEntry: Museum | Collection | Artifact;

  loadingEdit = true;
  errorEdit = false;

  displayCurrent = true;
  displayChanged = true;

  capitalizeFirstLetter = capitalizeFirstLetter;

  currentUserName: string;

  projectConfig: ProjectConfig;

  constructor(private activatedRoute: ActivatedRoute,
              private editService: EditService,
              private userInfoService: UserInfoService,
              private getByCategoryService: GetByCategoryService,
              private projectConfigService: ProjectConfigService,
              private modalService: NgbModal) {
    this.updateCurrentUsername(this.userInfoService.isLoggedIn);
    this.userInfoService.trackLoginStatus().subscribe((loggedIn: boolean) => {
      this.updateCurrentUsername(loggedIn);
    });
    this.projectConfig = projectConfigService.getProjectConfig();
  }

  private updateCurrentUsername(loggedIn: boolean = false) {
    if (loggedIn) {
      this.currentUserName = this.userInfoService.basicUserInfo?.username;
    } else {
      this.currentUserName = '';
    }
  }

  fetchCurrent(): void {
    this
      .getByCategoryService
      .getByCategoryAndId(this.category, this.changedEntry.id)
      .subscribe((res: ProtoMuseum | ProtoArtifact | ProtoCollection) => {
          if (this.projectConfig.isLogging()) {
            console.log('Current ' + this.category + ':');
            console.log(res);
          }
          if (this.category === 'museum') {
            this.currentEntry = PrototypeBuilder.buildFromPrototype({museum: res as ProtoMuseum});
          } else if (this.category === 'collection') {
            this.currentEntry = PrototypeBuilder.buildFromPrototype({collection: res as ProtoCollection});
          } else if (this.category === 'artifact') {
            this.currentEntry = PrototypeBuilder.buildFromPrototype({artifact: res as ProtoArtifact});
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      );
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.editId = params.get('editId');
      this.editService.getEdit(this.editId).subscribe((res: ProtoEdit) => {
        if (this.projectConfig.isLogging()) {
          console.log('Received edit: ');
          console.log(res);
        }
        this.edit = ProtoEdit.toEdit(res);
        this.category = this.edit.category;
        this.type = this.edit.type.toLowerCase();
        this.changedEntry = this.edit[this.category];
        switch (this.type) {
          case 'addition':
            this.displayCurrent = false;
            break;
          case 'deletion':
            this.displayCurrent = false;
            break;
        }
        if (this.displayCurrent) {
          this.fetchCurrent();
        }
        this.loadingEdit = false;
      }, (err: HttpErrorResponse) => {
        this.errorEdit = true;
        console.log(err);
      });
    });
  }

  deny(entry: Edit): void {
    this.reviewEdit(entry, false);
  }

  approve(entry: Edit): void {
    this.reviewEdit(entry, true);
  }

  reviewEdit(entry: Edit, action: boolean): void {
    const modal = this.modalService.open(ModalMessageComponent);
    const modalComponent: ModalMessageComponent = modal.componentInstance;
    modalComponent.title = 'Review Edit';
    modalComponent.modal = modal;
    modalComponent.waitingForServerResponse();
    this.editService.reviewEdit(entry, action).then(
      (res: ServerResponse) => {
        modalComponent.fromServerResponse(res);
      },
      (err: HttpErrorResponse) => {
        modalComponent.fromNetworkError(err);
      }
    );
  }
}
