import { Injectable } from '@angular/core';
import {UserInfoService} from './user/user-info.service';
import {Observable} from 'rxjs';
import {ProtoEdit} from './object-prototypes/proto-edit';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  constructor(private userInfoService: UserInfoService) { }
}
