export class BasicEntry {
  name: string;
  id: number;

  constructor(name?: string, id?: number | string) {
    this.name = name;
    this.id = typeof id === 'number' ? id : parseInt(id, 10);
  }
}
