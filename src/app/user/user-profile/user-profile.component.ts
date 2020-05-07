import {Component, OnInit} from '@angular/core';
import {UserInfoService} from '../../services/user/user-info.service';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {ProtoUser} from '../../services/object-prototypes/proto-user';
import {ProjectConfigService} from '../../services/config/project-config.service';
import {ProjectConfig} from '../../config/ProjectConfig';

/**
 * displays user profile: username, email, museums owned, and edits
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  /**
   * username of current user
   */
  username: string;
  /**
   * complete user information
   */
  user: User;

  /**
   * whether the program is waiting for server response of user info
   */
  loading: boolean;
  /**
   * whether an error occurred while loading user info
   */
  error: boolean;

  /**
   * stores logging configuration
   */
  projectConfig: ProjectConfig;

  /**
   * @param router routes user to login page if not logged in
   * @param userInfoService retrieves the complete user information
   * @param projectConfigService retrieves logging configuration
   */
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

  /**
   * if not logged in, ask for login
   *
   * if logged in, retrieve user info
   */
  ngOnInit(): void {
    if (!this.userInfoService.isLoggedIn) {
      this.router.navigateByUrl('/login');
    }

    this.getUserInfo();
  }

  /**
   * log out of the account can go to login page
   */
  logout(): void {
    this.userInfoService.logout();
    this.router.navigateByUrl('/login');
  }

}
