import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MuseumService} from '../../services/wiki-entry/museum.service';
import {UserInfoService} from '../../services/user/user-info.service';
import {Museum} from '../../models/Museum';
import {WikiEntryEditorComponent} from '../wiki-entry-editor/wiki-entry-editor.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalMessageComponent} from '../../static/modal-message/modal-message.component';
import {ServerCannotConnect} from '../../config/ServerCannotConnect';
import {ServerResponse} from '../../services/user/ServerResponse';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  category: string;

  @ViewChild(WikiEntryEditorComponent)
  wikiEntryEditor: WikiEntryEditorComponent;

  constructor(private route: ActivatedRoute,
              private museumService: MuseumService,
              private userService: UserInfoService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.category = params.get('category');
    });
  }

  public submit(): void {
    if (!this.wikiEntryEditor.wikiEntryFormGroup.valid) {
      return;
    }
    const newMuseum = Museum.of(this.wikiEntryEditor.getWikiEntry());
    const modal = this.modalService.open(ModalMessageComponent);
    const modalComponent = modal.componentInstance;
    modalComponent.title = 'Create New Museum';
    modalComponent.modal = modal;
    modalComponent.waitingForServerResponse();

    this.museumService
      .addMuseum(newMuseum, this.userService.getBasicUserInfo())
      .then(
        (res: ServerResponse) => {
          modalComponent.fromServerResponse(res);
        },
        (err: HttpErrorResponse) => {
          modalComponent.fromNetworkError(err);
          console.log(err);
        }
      );
  }
}
