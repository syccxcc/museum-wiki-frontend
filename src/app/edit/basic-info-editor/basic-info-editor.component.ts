import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MarkdownEditorComponent} from '../markdown-editor/markdown-editor.component';
import {BasicInfo} from '../../models/BasicInfo';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EXAMPLE_DESCRIPTION} from '../../user/registration/ExampleDescription';

@Component({
  selector: 'app-basic-info-editor',
  templateUrl: './basic-info-editor.component.html',
  styleUrls: ['./basic-info-editor.component.css']
})
export class BasicInfoEditorComponent implements OnInit {

  private static readonly URL_VALIDATION_REGEX = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  @Input() previousBasicInfo;

  public basicInfoFormGroup: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    let prevName = '';
    let prevIntroduction = '';
    let prevImage = '';
    let prevDescription = EXAMPLE_DESCRIPTION;
    if (this.previousBasicInfo) {
      prevName = this.previousBasicInfo.name;
      prevIntroduction = this.previousBasicInfo.introduction;
      prevImage = this.previousBasicInfo.image;
      prevDescription = this.previousBasicInfo.description;
    }
    this.basicInfoFormGroup = new FormGroup(
      {
        name: new FormControl(prevName, Validators.required),
        introduction: new FormControl(prevIntroduction, Validators.required),
        image: new FormControl(prevImage, Validators.pattern(BasicInfoEditorComponent.URL_VALIDATION_REGEX)),
        description: new FormControl(prevDescription)
      });
  }

  public getBasicInfo(): BasicInfo {
    return new BasicInfo(
      this.basicInfoFormGroup.get('name').value,
      this.basicInfoFormGroup.get('introduction').value,
      this.basicInfoFormGroup.get('description').value,
      this.basicInfoFormGroup.get('image').value,
      '');
  }

}
