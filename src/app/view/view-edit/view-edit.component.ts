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
import {ProjectConfig} from '../../config/ProjectConfig';
import {ModalMessageComponent} from '../../static/modal-message/modal-message.component';
import {ServerResponse} from '../../services/server-response';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {WikiEntry} from '../../models/wiki-entry';
import {BasicEntry} from '../../models/basic-entry';

/**
 * View for the details of an edit
 */
@Component({
  selector: 'app-view-edit',
  templateUrl: './view-edit.component.html',
  styleUrls: ['./view-edit.component.css']
})
export class ViewEditComponent implements OnInit {

  /**
   * Id of the edit
   */
  editId: string;
  /**
   * Category of the eit
   */
  category: string;
  /**
   * Type of edit (addition/deletion/edit)
   */
  type: string;

  /**
   * The complete edit object
   */
  edit: Edit;

  /**
   * The current entry in the database
   */
  currentEntry: Museum | Collection | Artifact;
  /**
   * The changed entry.
   */
  changedEntry: Museum | Collection | Artifact;

  /**
   * Whether program is waiting for backend response
   */
  loadingEdit = true;
  /**
   * Whether server gives an error
   */
  errorEdit = false;

  /**
   * Whether current version of the edited entry should be displayed
   */
  displayCurrent = true;
  /**
   * Whether changed version of the edited entry should be displayed
   */
  displayChanged = true;

  /**
   * Function to capitalize the first letter in a word
   */
  capitalizeFirstLetter = capitalizeFirstLetter;

  /**
   * The current username of the logged in user
   */
  currentUserName: string;

  private projectConfig: ProjectConfig;

  /**
   * Constructor tracks user login information to track username of logged in user
   *
   * @param activatedRoute Url
   * @param editService Provides edit info
   * @param userInfoService Provides user info
   * @param getByCategoryService Get an entry by category and id
   * @param projectConfigService Logging configuration
   * @param modalService Opens a modal for user feedback
   */
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

  /**
   * Update the current user name based on user info
   *
   * @param loggedIn Whether the user is logged in
   */
  private updateCurrentUsername(loggedIn: boolean = false) {
    if (loggedIn) {
      this.currentUserName = this.userInfoService.basicUserInfo?.username;
    } else {
      this.currentUserName = '';
    }
  }

  /**
   * Fetch the current status of the edit
   */
  private fetchCurrent(): void {
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

  /**
   * Fetch the current edit by id
   */
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

  /**
   * Deny an edit
   *
   * @param entry The edit to be denied
   */
  deny(entry: Edit): void {
    this.reviewEdit(entry, false);
  }

  /**
   * Approve an edit
   *
   * @param entry The edit to be approved
   */
  approve(entry: Edit): void {
    this.reviewEdit(entry, true);
  }

  /**
   * Send in the review of an edit
   *
   * @param entry Edit that is reviewed
   * @param action True for approve; false for deny
   */
  private reviewEdit(entry: Edit, action: boolean): void {
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

  /**
   * Retrieve the id of the museum of an artifact
   *
   * @param entry The artifact
   */
  getMuseumId(entry: WikiEntry): number {
    return (entry as Artifact).museum.id;
  }

  /**
   * Retrieve the collection list of the museum of an artifact
   *
   * @param currentEntry The artifact
   */
  getCollectionList(currentEntry: Museum | Collection | Artifact): BasicEntry[] {
    return (currentEntry as Artifact).collectionList;
  }
}
