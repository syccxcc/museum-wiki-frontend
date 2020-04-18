import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MuseumService} from '../../services/museum.service';
import {UserInfoService} from '../../services/user/user-info.service';
import {Museum} from '../../models/Museum';
import {BasicInfoEditorComponent} from '../basic-info-editor/basic-info-editor.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  category: string;

  @ViewChild(BasicInfoEditorComponent)
  private basicInfoEditor: BasicInfoEditorComponent;

  constructor(private route: ActivatedRoute,
              private museumService: MuseumService,
              private userService: UserInfoService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.category = params.get('category');
    });
  }

  public submit(): void {
    // FIXME: add form validation to disallow trivial mistakes
    const newMuseum = Museum.of(this.basicInfoEditor.getBasicInfo());
    console.log(newMuseum);

    this.museumService
      .addMuseum(newMuseum, this.userService.getBasicUserInfo())
      .then(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );

    // TODO: complete the then statement
  }

}
