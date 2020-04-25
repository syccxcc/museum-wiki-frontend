import {BasicEntry} from '../basic-entry';

export class BasicEntryBuilder<T extends BasicEntryBuilder<T, E>, E extends BasicEntry> {
  protected entry: E;

  constructor(Type?) {
    if (Type) {
      this.entry = new Type();
    } else {
      this.entry = new BasicEntry() as E;
    }
  }

  public name(name: string): T {
    this.entry.name = name;
    return this.self();
  }

  public id(id: number | string): T {
    this.entry.id = typeof id === 'number' ? id : parseInt(id, 10);
    return this.self();
  }

  public build(): E {
    return this.entry;
  }

  public self(): T {
    return this as unknown as T;
  }
}
