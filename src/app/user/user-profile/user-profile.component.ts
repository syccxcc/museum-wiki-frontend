import { Component, OnInit } from '@angular/core';
import {UserInfoService} from '../../services/user-info.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private userInfoService: UserInfoService) {
  }

  ngOnInit(): void {
    // TODO: create user profile page
  }

}
