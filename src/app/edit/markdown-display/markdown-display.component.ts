import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-markdown-display',
  templateUrl: './markdown-display.component.html',
  styleUrls: ['./markdown-display.component.css']
})
export class MarkdownDisplayComponent implements OnInit {

  @Input() markdownText: string;

  constructor() { }

  ngOnInit(): void {
  }

}
