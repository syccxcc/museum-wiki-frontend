import {Component, OnInit} from '@angular/core';
import {UserInfoService} from '../../services/user/user-info.service';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {ProtoUser} from '../../services/object-prototypes/proto-user';

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

  constructor(private router: Router,
              private userInfoService: UserInfoService) {
    this.username = userInfoService.getBasicUserInfo().username;
    this.loading = true;
    this.error = false;
  }

  ngOnInit(): void {
    if (!this.userInfoService.isLoggedIn) {
      this.router.navigateByUrl('/login');
    }

    this.userInfoService.getCompleteUserInfo().subscribe(
      (res: ProtoUser) => {
      this.user = res.toUser();
      this.loading = false;
    }, (error) => {
      this.error = true;
      console.log(error);
    });
  }

  logout(): void {
    this.userInfoService.logout();
    this.router.navigateByUrl('/login');
  }

}
