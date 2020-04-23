import {BasicEntry} from '../basic-entry';

export class BasicEntryBuilder {
  private readonly entry: BasicEntry;

  constructor() {
    this.entry = new BasicEntry();
  }

  public setName(name: string): BasicEntryBuilder {
    this.entry.name = name;
    return this;
  }

  public setId(id: number): BasicEntryBuilder {
    this.entry.id = id;
    return this;
  }

  public build(): BasicEntry {
    return this.entry;
  }
}
