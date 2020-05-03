import {Component, OnInit} from '@angular/core';
import {UserInfoService} from '../../services/user/user-info.service';
import {BasicUserInfo} from '../../models/basic-user-info';
import {ServerResponse} from '../../services/server-response';
import {Router} from '@angular/router';
import {PreviousRouteService} from '../../services/previous-route.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalMessageComponent} from '../../static/modal-message/modal-message.component';
import {ResetPasswordModalComponent} from '../../static/reset-password-modal/reset-password-modal.component';
import {HttpErrorResponse} from '@angular/common/http';
import {ProjectConfigService} from '../../services/config/project-config.service';
import {ProjectConfig} from '../../config/ProjectConfig';
import {Wrapper} from '../../models/Wrapper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  projectConfig: ProjectConfig;

  constructor(private router: Router,
              private previousRoute: PreviousRouteService,
              private userInfoService: UserInfoService,
              private modalService: NgbModal,
              projectConfigService: ProjectConfigService) {

    this.projectConfig = projectConfigService.getProjectConfig();

    if (userInfoService.isLoggedIn) {
      if (previousRoute.previousRoute) {
        previousRoute.toPreviousRoute();
      } else {
        router.navigateByUrl('/user-profile');
      }
    }

    this.username = '';
    this.password = '';
  }

  ngOnInit(): void {
  }

  public login(): void {
    // FIXME: add form validation
    const REDIRECT_WAIT_TIME = 1000;

    const userInfo = new BasicUserInfo(this.username, this.password);
    const modal = this.modalService.open(ModalMessageComponent);
    const modalComponent = modal.componentInstance;
    modalComponent.title = 'Trying to Login';
    modalComponent.modal = modal;
    modalComponent.waitingForServerResponse();
    this.userInfoService.login(userInfo).then(
      (response: ServerResponse) => {
        modalComponent.fromServerResponse(response);
        if (response.success) {
          if (this.previousRoute.previousRoute != null) {
            modalComponent.message += '\nRedirecting to previous page...';
            setTimeout(() => {
              modal.close();
              this.previousRoute.toPreviousRoute();
            }, REDIRECT_WAIT_TIME);
          } else {
            modalComponent.message += '\nRedirecting to home page...';
            setTimeout(() => {
              modal.close();
              this.router.navigateByUrl('/home');
            }, REDIRECT_WAIT_TIME);
          }
        }
      },
      (error) => {
        modalComponent.fromNetworkError(error);
        console.log(error);
      }
    );
  }

  public register(): void {
    this.router.navigateByUrl('/register');
  }

  public openModalWithPromise(promise: Promise<ServerResponse>) {
    if (!promise) {
      return;
    }
    const modal = this.modalService.open(ModalMessageComponent);
    const modalMessageComponent: ModalMessageComponent = modal.componentInstance;
    modalMessageComponent.modal = modal;
    modalMessageComponent.title = 'Reset Password';
    modalMessageComponent.waitingForServerResponse();
    promise.then(
      (response: ServerResponse) => {
        modalMessageComponent.fromServerResponse(response);
      },
      (err: HttpErrorResponse) => {
        modalMessageComponent.fromNetworkError(err);
      }
    );
  }

  resetPassword(): void {
    const resetPasswordModal = this.modalService.open(ResetPasswordModalComponent);
    resetPasswordModal.componentInstance.modal = resetPasswordModal;
    resetPasswordModal.result.then(
      (resetPromiseWrapper: Wrapper<Promise<ServerResponse>>) => {
        this.openModalWithPromise(resetPromiseWrapper.value);
      }, (dismiss: any) => {
        console.log('Modal dismissed, reason: ');
        console.log(dismiss);
      }
    );
  }
}
