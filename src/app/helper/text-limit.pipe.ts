import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'textLimit'
})
export class TextLimitPipe implements PipeTransform {

  transform(text: string, args: string[]): string {
    const lengthLimit = parseInt(args[0], 10);
    const trailingText = args.length > 1 ? args[1] : '...';
    return text.length > lengthLimit ?
      text.substring(0, lengthLimit) + trailingText :
      text;
  }

}
