import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/user/login.service';
import {User} from '../../models/User';
import {UserInfoService} from '../../services/user/user-info.service';
import {ServerResponse} from '../../services/user/ServerResponse';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalMessageComponent} from '../../static/modal-message/modal-message.component';
import {FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  private static readonly _MIN_USERNAME_LENGTH = 2;
  private static readonly _MAX_USERNAME_LENGTH = 20;

  private static readonly _MIN_PASSWORD_LENGTH = 6;
  private static readonly _MAX_PASSWORD_LENGTH = 20;

  registrationForm = new FormGroup({
    username: new FormControl(
      '',
      [
        Validators.required,
        Validators.minLength(RegistrationComponent._MIN_USERNAME_LENGTH),
        Validators.maxLength(RegistrationComponent._MAX_USERNAME_LENGTH)]),
    password: new FormControl('',
      [Validators.minLength(RegistrationComponent._MIN_PASSWORD_LENGTH),
        Validators.maxLength(RegistrationComponent._MAX_PASSWORD_LENGTH)]),
    retypePassword: new FormControl('', RegistrationComponent.retypePasswordValidator),
    email: new FormControl('', [Validators.email])
  }, {validators: [RegistrationComponent.retypePasswordValidator]});

  constructor(private router: Router,
              private loginService: LoginService,
              private userInfoService: UserInfoService,
              private modalService: NgbModal) {
  }

  private static retypePasswordValidator(form: FormGroup): ValidationErrors | null {
    const password = form.value.password;
    const retypePassword = form.value.retypePassword;
    return password === retypePassword ? null : {passwordNotMatch: true};
  }

  ngOnInit(): void {
  }

  register(): void {
    const form = this.registrationForm;
    const newUser: User = new User(
      form.get('username').value,
      form.get('email').value,
      form.get('password').value);

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
            modalComponent.message += '\nRedirecting to login page in 3 seconds.';
            setTimeout(() => {
              modal.close();
              this.router.navigateByUrl('/login');
            }, 3000);
          }
        },
        (error) => {
          modalComponent.fromNetworkError(error);
          console.log(error);
        }
      );
  }


  get MIN_USERNAME_LENGTH(): number {
    return RegistrationComponent._MIN_USERNAME_LENGTH;
  }

  get MAX_USERNAME_LENGTH(): number {
    return RegistrationComponent._MAX_USERNAME_LENGTH;
  }

  get MIN_PASSWORD_LENGTH(): number {
    return RegistrationComponent._MIN_PASSWORD_LENGTH;
  }

  get MAX_PASSWORD_LENGTH(): number {
    return RegistrationComponent._MAX_PASSWORD_LENGTH;
  }
}
