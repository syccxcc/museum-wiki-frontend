import { Pipe, PipeTransform } from '@angular/core';
import * as marked from 'marked';
import {mark} from '@angular/compiler-cli/src/ngtsc/perf/src/clock';

@Pipe({
  name: 'marked'
})
export class MarkedPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    if (value && value.length > 0) {
      console.log(marked(value));
      return marked(value);
    }
    return value;
  }

}
