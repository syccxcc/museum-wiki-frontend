/**
 * Capitalizes the first letter of a string
 *
 * @param str The string to be processed
 */
export function capitalizeFirstLetter(str: string): string {
  return str?.charAt(0).toUpperCase().concat(str.substring(1));
}
