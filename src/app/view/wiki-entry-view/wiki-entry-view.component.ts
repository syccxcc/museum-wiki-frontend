import {Component, Input, OnInit} from '@angular/core';
import {WikiEntry} from '../../models/wiki-entry';
import {Router} from '@angular/router';
import {UserInfoService} from '../../services/user/user-info.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ArtifactService} from '../../services/wiki-entry/artifact.service';
import {ModalMessageComponent} from '../../static/modal-message/modal-message.component';
import {ServerResponse} from '../../services/server-response';
import {HttpErrorResponse} from '@angular/common/http';

/**
 * View a wiki-entry containing only name, intro, image, and description
 * This view is mostly category agnostic, meaning that despite the category,
 * the displayed content will be similar.
 */
@Component({
  selector: 'app-wiki-entry-view',
  templateUrl: './wiki-entry-view.component.html',
  styleUrls: ['./wiki-entry-view.component.css']
})
export class WikiEntryViewComponent implements OnInit {

  /**
   * The entry to be displayed
   */
  @Input() wikiEntry: WikiEntry;
  /**
   * Whether an edit button should appear for this entry
   */
  @Input() canEdit: boolean;
  /**
   * Category of entry.
   * Only purpose is to help router and to determine whether a delete button should be displayed
   * for an entry. Only artifacts can be deleted by anyone.
   */
  @Input() category: string;
  /**
   * Whether a delete button can appear for this entry.
   */
  @Input() canDelete: boolean;

  /**
   * Constructor
   *
   * @param router Routes back to user profile
   * @param userInfoService Deletion allowed only when user is logged in
   * @param modalService Opens a modal
   * @param artifactService Help with artifact deletion
   */
  constructor(private router: Router,
              private userInfoService: UserInfoService,
              private modalService: NgbModal,
              private artifactService: ArtifactService) {
  }

  /**
   * Determines whether the current entry can be deleted
   */
  ngOnInit(): void {
    if (this.canDelete === undefined || this.canDelete === null) {
      this.canDelete = this.userInfoService.isLoggedIn && this.category === 'artifact';
    }
  }

  /**
   * Route to edit page of the current entry
   */
  edit(): void {
    this.router.navigateByUrl('/edit/' + this.category + '/' + this.wikiEntry.id);
  }

  /**
   * Delete the current entry.
   * Deletion available only for artifacts.
   */
  delete(): void {
    const modal = this.modalService.open(ModalMessageComponent);
    const modalComponent: ModalMessageComponent = modal.componentInstance;
    modalComponent.title = 'Delete Artifact';
    modalComponent.modal = modal;
    modalComponent.waitingForServerResponse();
    this.artifactService
      .deleteArtifact(this.wikiEntry.id)
      .then((res: ServerResponse) => {
        modalComponent.fromServerResponse(res);
      }, (err: HttpErrorResponse) => {
        modalComponent.fromNetworkError(err);
      });
  }
}
