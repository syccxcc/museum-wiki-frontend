import {Component, OnInit} from '@angular/core';
import {UserInfoService} from '../../services/user/user-info.service';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {ProtoUser} from '../../services/object-prototypes/proto-user';
import {ProjectConfigService} from '../../services/config/project-config.service';
import {ProjectConfig} from '../../config/ProjectConfig';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  username: string;
  user: User;

  loading: boolean;
  error: boolean;

  projectConfig: ProjectConfig;

  constructor(private router: Router,
              private userInfoService: UserInfoService,
              private projectConfigService: ProjectConfigService) {
    this.username = userInfoService.getBasicUserInfo().username;
    this.loading = true;
    this.error = false;
    this.projectConfig = projectConfigService.getProjectConfig();
  }

  /**
   * request detailed user info from the server
   * called either when user profile page is visited or when an action (delete museum, approve/deny edit) changes
   * user profile, making reloading necessary
   */
  getUserInfo(): void {
    this.userInfoService
      .getCompleteUserInfo()
      .toPromise()
      .then((res: ProtoUser) => {
        if (this.projectConfig.isLogging()) {
          console.log('User received from backend: ');
          console.log(res);
        }
        // convert received JSON object to User object
        this.user = ProtoUser.toUser(res);
        this.loading = false;
      }, (error) => {
        this.error = true;
        console.log(error);
      });
  }

  ngOnInit(): void {
    if (!this.userInfoService.isLoggedIn) {
      this.router.navigateByUrl('/login');
    }

    this.getUserInfo();
  }

  logout(): void {
    this.userInfoService.logout();
    this.router.navigateByUrl('/login');
  }

}
