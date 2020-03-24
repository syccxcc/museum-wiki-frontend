export class Museum {
  name: string;
  description: string;
  curatorId: number;

  constructor(name: string, description: string, curatorId: number) {
    this.name = name;
    this.description = description;
    this.curatorId = curatorId;
  }
}
