import {Pipe, PipeTransform} from '@angular/core';
import * as marked from 'marked';

/**
 * Transforms a markdown text into corresponding html code
 */
@Pipe({
  name: 'marked'
})
export class MarkedPipe implements PipeTransform {

  /**
   * Transform a markdown text into corresponding html code
   *
   * @param value The Markdown text to be transformed
   * @param args All args are ignored
   */
  transform(value: any, ...args: unknown[]): any {
    if (value && value.length > 0) {
      return marked(value);
    }
    return value;
  }

}
