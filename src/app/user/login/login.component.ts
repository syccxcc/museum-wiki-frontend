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
              private projectConfigService: ProjectConfigService) {

    this.projectConfig = projectConfigService.getProjectConfig();
  }

  ngOnInit(): void {
    // if user is logged in, should not prompt user to login again
    if (this.userInfoService.isLoggedIn) {
      // redirect user to the previous link user is blocked from because the user is not logged in
      if (this.previousRoute.previousRoute) {
        this.previousRoute.toPreviousRoute();
      } else {
        // if user was not blocked from any logged in user exclusive page, go to profile
        this.router.navigateByUrl('/user-profile');
      }
    }

    this.username = '';
    this.password = '';
  }

  /**
   * try to login the user in based on the provided username and password
   */
  public login(): void {
    // FIXME: add form validation

    // time to wait before redirecting the user after a successful login
    const REDIRECT_WAIT_TIME = 1000;

    // construct user information and create a modal to give user feedback
    const userInfo = new BasicUserInfo(this.username, this.password);
    const modal = this.modalService.open(ModalMessageComponent);
    const modalComponent = modal.componentInstance;
    modalComponent.title = 'Trying to Login';
    modalComponent.modal = modal;
    modalComponent.waitingForServerResponse();

    // try to login
    this.userInfoService.login(userInfo).then(
      (response: ServerResponse) => {
        // update modal's message based on response, which is either success or failure
        modalComponent.fromServerResponse(response);
        if (response.success) {
          // if login success, wait for a while and redirect
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
        // adjust modal if there's an error and log that error
        modalComponent.fromNetworkError(error);
        console.log(error);
      }
    );
  }

  public register(): void {
    this.router.navigateByUrl('/register');
  }

  /**
   * opens a modal, and then adjust the modal based on the response from the promise
   * note: some sections are hard-coded for reset password, so this method must
   * be readjusted to be used elsewhere
   *
   * @param promise a promise whose response will affect the modal
   */
  public openModalWithPromise(promise: Promise<ServerResponse>) {
    if (!promise) {
      return;
    }
    // open modal for reset password
    const modal = this.modalService.open(ModalMessageComponent);
    const modalMessageComponent: ModalMessageComponent = modal.componentInstance;
    modalMessageComponent.modal = modal;
    modalMessageComponent.title = 'Reset Password';
    modalMessageComponent.waitingForServerResponse();
    // adjust modal based on server response
    promise.then(
      (response: ServerResponse) => {
        modalMessageComponent.fromServerResponse(response);
      },
      (err: HttpErrorResponse) => {
        modalMessageComponent.fromNetworkError(err);
      }
    );
  }

  /**
   * open a modal for password reset and prompt the user to enter relevant information
   * then open another modal to display the result of the password reset attempt
   */
  resetPassword(): void {
    const resetPasswordModal = this.modalService.open(ResetPasswordModalComponent);
    resetPasswordModal.componentInstance.modal = resetPasswordModal;
    resetPasswordModal.result.then(
      // the reset password modal will return a promise, which is an async response from the server
      // about the result of this password reset attempt
      (resetPromiseWrapper: Wrapper<Promise<ServerResponse>>) => {
        // open a modal and, based on the server response, display the result of password reset
        this.openModalWithPromise(resetPromiseWrapper.value);
      }, (dismiss: any) => {
        if (this.projectConfig.isLogging()) {
          console.log('Modal dismissed, reason: ');
          console.log(dismiss);
        }
      }
    );
  }
}
