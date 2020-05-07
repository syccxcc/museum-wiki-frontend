/**
 * Minimal information for an entry.
 */
export class BasicEntry {
  /**
   * Name of entry
   */
  name: string;
  /**
   * Id of entry
   */
  id: number;

  /**
   * Constructor
   *
   * @param name Name of entry
   * @param id Id of entry
   */
  constructor(name?: string, id?: number | string) {
    this.name = name;
    this.id = typeof id === 'number' ? id : parseInt(id, 10);
  }
}
