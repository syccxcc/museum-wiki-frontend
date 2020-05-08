import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * An editor for Markdown that supports rendering
 */
@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.css'],
})
export class MarkdownEditorComponent {

  /**
   * A form control for the input text.
   */
  @Input() descriptionFormControl: FormControl;

  /**
   * Markdown text used for preview.
   */
  previewText: string;

  /**
   * Whether the user typed Markdown text will be rendered realtime.
   */
  realTimeRendering: boolean;

  /**
   * Set preview text to empty string
   */
  constructor() {
    this.previewText = '';
  }

  /**
   * Render the current text in Markdown
   */
  public renderMarkdown(): void {
    this.previewText = this.descriptionFormControl.value;
  }
}
