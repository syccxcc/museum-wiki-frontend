import * as sha512 from 'js-sha512';

/**
 * Helps with hashing
 */
export class HashHelper {
  /**
   * Creates the SHA512 hash to a text
   *
   * @param text The text to be hashed
   */
  public static hash(text: string): string {
    return sha512.sha512(text);
  }
}
