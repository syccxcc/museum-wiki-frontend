import {Pipe, PipeTransform} from '@angular/core';

/**
 * Limit the length of a text
 */
@Pipe({
  name: 'textLimit'
})
export class TextLimitPipe implements PipeTransform {

  /**
   * Limit the length of a text
   *
   * @param text The text whose length will be limited
   * @param args First argument is length limit of text.
   * Second argument is the replacement for text exceeding the maximum length. Default to "...".
   */
  transform(text: string, args: string[]): string {
    if (!text) {
      return '';
    }
    const lengthLimit = parseInt(args[0], 10);
    const trailingText = args.length > 1 ? args[1] : '...';
    return text.length > lengthLimit ?
      text.substring(0, lengthLimit) + trailingText :
      text;
  }

}
