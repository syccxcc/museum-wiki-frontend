import {BasicEntry} from '../basic-entry';

/**
 * Builds a basic entry.
 * Supports inheritance of Artifact/Collection/Museum Builder through use of generics.
 * T stands for the Builder this will become.
 * E stands for the type of object this builder will build.
 */
export class BasicEntryBuilder<T extends BasicEntryBuilder<T, E>, E extends BasicEntry> {
  /**
   * The entry that will be created.
   */
  protected entry: E;

  /**
   * Creates the entry
   *
   * @param Type The type that should be created. If not provided, use the generic argument.
   */
  constructor(Type?) {
    if (Type) {
      this.entry = new Type();
    } else {
      this.entry = new BasicEntry() as E;
    }
  }

  /**
   * Builder method
   *
   * @param name Set name of entry
   */
  public name(name: string): T {
    this.entry.name = name;
    return this.self();
  }

  /**
   * Builder method
   *
   * @param id Set id of entry
   */
  public id(id: number | string): T {
    this.entry.id = typeof id === 'number' ? id : parseInt(id, 10);
    return this.self();
  }

  /**
   * Build the entry
   */
  public build(): E {
    return this.entry;
  }

  /**
   * Return this builder as a T, which is another builder that extends BasicEntryBuilder
   */
  public self(): T {
    return this as unknown as T;
  }
}
