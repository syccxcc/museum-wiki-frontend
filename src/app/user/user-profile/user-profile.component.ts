import {Component, OnInit} from '@angular/core';
import {UserInfoService} from '../../services/user/user-info.service';
import {User} from '../../models/User';

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

  constructor(private userInfoService: UserInfoService) {
    this.username = userInfoService.getBasicUserInfo().username;
    this.loading = true;
    this.error = false;
  }

  ngOnInit(): void {
    this.userInfoService.getCompleteUserInfo().then((res: User) => {
      this.user = res;
      this.loading = false;
    }, (error) => {
      this.error = true;
      console.log(error);
    });
  }

  logout(): void {
    this.userInfoService.logout();
  }

}
