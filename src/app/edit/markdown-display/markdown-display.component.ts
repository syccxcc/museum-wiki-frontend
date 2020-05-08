import {Component, Input, OnInit} from '@angular/core';

/**
 * Interpret a string as Markdown and then display the rendered text as Html
 */
@Component({
  selector: 'app-markdown-display',
  templateUrl: './markdown-display.component.html',
  styleUrls: ['./markdown-display.component.css']
})
export class MarkdownDisplayComponent implements OnInit {

  /**
   * A string containing Markdown text
   */
  @Input() markdownText: string;

  /**
   * Changes tracked through input binding, so no initialization necessary
   */
  ngOnInit(): void {
  }

}
