import * as sha512 from 'js-sha512';

export class HashHelper {
  public static hash(text: string): string {
    return sha512.sha512(text);
  }
}
