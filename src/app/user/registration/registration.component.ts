import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {User} from '../../models/User';
import {UserInfoService} from '../../services/user-info.service';
import {ServerResponse} from '../../services/user/ServerResponse';
import {Router} from '@angular/router';
import {PreviousRouteService} from '../../services/previous-route.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  username: string;
  password: string;
  retypePassword: string;
  email: string;

  constructor(private router: Router,
              private loginService: LoginService,
              private userInfoService: UserInfoService,
              private previousRoute: PreviousRouteService) {
  }

  ngOnInit(): void {
  }

  register(): void {
    // TODO: add form validation
    // TODO: add more elaborate response
    const newUser: User = new User(this.username, this.email, this.password);
    this
      .loginService
      .register(newUser)
      .then((registrationResponse: ServerResponse) => {
        if (registrationResponse.success) {
          this.userInfoService.login(newUser).then(
            (loginResponse: ServerResponse) => {
              if (loginResponse.success) {
                if (this.previousRoute.previousRoute !== null) {
                  this.router.navigateByUrl(this.previousRoute.previousRoute.url.join());
                } else {
                  this.router.navigateByUrl('/home');
                }
              } else {
                console.log(loginResponse);
              }
            },
            (error) => {
              console.log(error);
            }
          );
        } else {
          console.log(registrationResponse);
        }
      }, (error) => {
        console.log(error);
      });
  }
}
