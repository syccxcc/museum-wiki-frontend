import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/user/login.service';
import {User} from '../../models/user';
import {UserInfoService} from '../../services/user/user-info.service';
import {ServerResponse} from '../../services/server-response';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalMessageComponent} from '../../static/modal-message/modal-message.component';
import {FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';

/**
 * facilitates user registration
 */
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  /**
   * minimum username length
   */
  private static readonly _MIN_USERNAME_LENGTH = 2;
  /**
   * maximum username length
   */
  private static readonly _MAX_USERNAME_LENGTH = 20;

  /**
   * minimum password length
   */
  private static readonly _MIN_PASSWORD_LENGTH = 6;
  /**
   * maximum password length
   */
  private static readonly _MAX_PASSWORD_LENGTH = 20;

  /**
   * form group for user registration
   */
  registrationForm = new FormGroup({
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(RegistrationComponent._MIN_USERNAME_LENGTH),
          Validators.maxLength(RegistrationComponent._MAX_USERNAME_LENGTH)]),
      password: new FormControl('',
        [
          Validators.minLength(RegistrationComponent._MIN_PASSWORD_LENGTH),
          Validators.maxLength(RegistrationComponent._MAX_PASSWORD_LENGTH)]),
      retypePassword: new FormControl('', RegistrationComponent.retypePasswordValidator),
      email: new FormControl('', [Validators.email])
    },
    {
      // validate that retyped password matches the password
      validators: [RegistrationComponent.retypePasswordValidator]
    });

  /**
   * constructor
   *
   * @param router route to other pages
   * @param loginService handle registration
   * @param userInfoService determine user login information
   * @param modalService open modal for user feedback
   */
  constructor(private router: Router,
              private loginService: LoginService,
              private userInfoService: UserInfoService,
              private modalService: NgbModal) {
  }

  /**
   * validate whether the user has the correct retyped password
   *
   * @param form the registration form containing password and retyped password
   */
  private static retypePasswordValidator(form: FormGroup): ValidationErrors | null {
    const password = form.value.password;
    const retypePassword = form.value.retypePassword;
    return password === retypePassword ? null : {passwordNotMatch: true};
  }

  /**
   * determine whether user is already registered
   * if so, go straight to user profile
   */
  ngOnInit(): void {
    if (this.userInfoService.isLoggedIn) {
      this.router.navigateByUrl('user-profile');
    }
  }

  /**
   * create a new account
   */
  register(): void {
    const form = this.registrationForm;
    // create new user object
    const newUser: User = new User(
      form.get('username').value,
      form.get('email').value,
      form.get('password').value
    );

    // open modal and let it display the message for waiting for server response
    const modal = this.modalService.open(ModalMessageComponent);
    const modalComponent = modal.componentInstance;
    modalComponent.title = 'Registration';
    modalComponent.modal = modal;
    modalComponent.waitingForServerResponse();

    this
      .loginService
      .register(newUser)
      .then(
        (res: ServerResponse) => {
          modalComponent.fromServerResponse(res);
          if (res.success) {
            // let user login after successful registration
            modalComponent.message += '\nRedirecting to login page in 1 second.';
            setTimeout(() => {
              modal.close();
              this.router.navigateByUrl('/login');
            }, 1000);
          }
        },
        (error) => {
          modalComponent.fromNetworkError(error);
          console.log(error);
        }
      );
  }

  /**
   * getter
   */
  get MIN_USERNAME_LENGTH(): number {
    return RegistrationComponent._MIN_USERNAME_LENGTH;
  }

  /**
   * getter
   */
  get MAX_USERNAME_LENGTH(): number {
    return RegistrationComponent._MAX_USERNAME_LENGTH;
  }

  /**
   * getter
   */
  get MIN_PASSWORD_LENGTH(): number {
    return RegistrationComponent._MIN_PASSWORD_LENGTH;
  }

  /**
   * getter
   */
  get MAX_PASSWORD_LENGTH(): number {
    return RegistrationComponent._MAX_PASSWORD_LENGTH;
  }
}
