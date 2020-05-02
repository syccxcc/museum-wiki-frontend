import {Component, Input, OnInit} from '@angular/core';
import {WikiEntry} from '../../models/wiki-entry';
import {Router} from '@angular/router';
import {UserInfoService} from '../../services/user/user-info.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ArtifactService} from '../../services/wiki-entry/artifact.service';
import {ModalMessageComponent} from '../../static/modal-message/modal-message.component';
import {ServerResponse} from '../../services/server-response';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-wiki-entry-view',
  templateUrl: './wiki-entry-view.component.html',
  styleUrls: ['./wiki-entry-view.component.css']
})
export class WikiEntryViewComponent implements OnInit {

  @Input() wikiEntry: WikiEntry;
  @Input() canEdit: boolean;
  @Input() category: string;
  @Input() canDelete: boolean;

  constructor(private router: Router,
              private userInfoService: UserInfoService,
              private modalService: NgbModal,
              private artifactService: ArtifactService) {
  }

  ngOnInit(): void {
    if (this.canDelete === undefined || this.canDelete === null) {
      this.canDelete = this.userInfoService.isLoggedIn && this.category === 'artifact';
    }
  }

  edit(): void {
    this.router.navigateByUrl('/edit/' + this.category + '/' + this.wikiEntry.id);
  }

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
