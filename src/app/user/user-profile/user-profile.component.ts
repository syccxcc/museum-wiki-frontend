import {Component, OnInit} from '@angular/core';
import {UserInfoService} from '../../services/user-info.service';
import {User} from '../../models/User';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User;

  constructor(private userInfoService: UserInfoService) {
  }

  ngOnInit(): void {
    // TODO: create user profile page
    this.userInfoService.getCompleteUserInfo().then((res: User) => {
      this.user = res;
    }, (error) => {
      console.log(error);
    });
  }

}
