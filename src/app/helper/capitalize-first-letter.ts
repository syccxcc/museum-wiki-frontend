export function capitalizeFirstLetter(str: string): string {
  return str?.charAt(0).toUpperCase().concat(str.substring(1));
}
