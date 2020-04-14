import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {prepareEventListenerParameters} from '@angular/compiler/src/render3/view/template';
import {MarkdownEditorComponent} from '../markdown-editor/markdown-editor.component';
import {BasicInfo} from '../../models/BasicInfo';

@Component({
  selector: 'app-basic-info-editor',
  templateUrl: './basic-info-editor.component.html',
  styleUrls: ['./basic-info-editor.component.css']
})
export class BasicInfoEditorComponent implements OnInit {

  @Input() previousBasicInfo;

  @ViewChild(MarkdownEditorComponent)
  private markdownEditorComponent: MarkdownEditorComponent;

  name = '';
  introduction = '';
  description = '';

  constructor() {
  }

  ngOnInit(): void {
    if (this.previousBasicInfo) {
      this.name = this.previousBasicInfo.name;
      this.introduction = this.previousBasicInfo.introduction;
      this.description = this.previousBasicInfo.description;
    }
  }

  public getBasicInfo(): BasicInfo {
    return new BasicInfo(this.name, this.introduction, this.markdownEditorComponent.inputText, '')
  }

}
