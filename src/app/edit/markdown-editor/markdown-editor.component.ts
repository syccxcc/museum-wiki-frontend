import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.css'],
})

export class MarkdownEditorComponent implements OnInit {

  markdownText: string;

  realTimeRendering: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
