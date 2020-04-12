import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.css'],
})

export class MarkdownEditorComponent implements OnInit {

  public inputText: string;
  previewText: string;

  realTimeRendering: boolean;

  constructor() {
    this.previewText = '';
  }

  ngOnInit(): void {
  }

  public renderMarkdown(): void {
    this.previewText = this.inputText;
  }
}
