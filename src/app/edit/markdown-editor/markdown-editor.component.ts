import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.css'],
})

export class MarkdownEditorComponent implements OnInit {

  @Input() descriptionFormControl: FormControl;
  previewText: string;

  realTimeRendering: boolean;

  constructor() {
    this.previewText = '';
  }

  ngOnInit(): void {
  }

  public renderMarkdown(): void {
    this.previewText = this.descriptionFormControl.value;
  }
}
