export class BasicInfo {
  name: string;
  introduction: string;
  description: string;
  id: string;

  constructor(name: string, introduction: string, description: string, id: string) {
    this.name = name;
    this.introduction = introduction;
    this.description = description;
    this.id = id;
  }

  public static of(basicInfo: BasicInfo) {
    return new BasicInfo(basicInfo.name, basicInfo.introduction, basicInfo.description, basicInfo.id);
  }

}
