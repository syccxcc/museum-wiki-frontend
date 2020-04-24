import {BasicEntry} from '../basic-entry';
import {logging} from 'selenium-webdriver';
import Entry = logging.Entry;

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

  public id(id: number): T {
    this.entry.id = id;
    return this.self();
  }

  public build(): E {
    return this.entry;
  }

  public self(): T {
    return this as unknown as T;
  }
}
