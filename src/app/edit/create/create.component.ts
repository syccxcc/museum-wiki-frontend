import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MuseumService} from '../../services/museum.service';
import {UserInfoService} from '../../services/user/user-info.service';
import {Museum} from '../../models/Museum';
import {BasicInfoEditorComponent} from '../basic-info-editor/basic-info-editor.component';
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

  @ViewChild(BasicInfoEditorComponent)
  private basicInfoEditor: BasicInfoEditorComponent;

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
    // TODO: switch to reactive forms and add form validation
    const newMuseum = Museum.of(this.basicInfoEditor.getBasicInfo());
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
