export class BasicInfo {
  public static readonly noImageMessage = 'no link provided for image';

  name: string;
  introduction: string;
  description: string;
  id: string;
  private imageAddress: string;

  constructor(name: string, introduction: string, image: string, description: string, id: string) {
    this.name = name;
    this.introduction = introduction;
    this.image = image;
    this.description = description;
    this.id = id;
  }

  public static of(basicInfo: BasicInfo) {
    return new BasicInfo(basicInfo.name, basicInfo.introduction, basicInfo.description, basicInfo.image, basicInfo.id);
  }


  get image(): string {
    return this.imageAddress ? this.imageAddress : BasicInfo.noImageMessage;
  }

  set image(value: string) {
    this.imageAddress = value;
  }
}
