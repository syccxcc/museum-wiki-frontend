import {BasicInfo} from './BasicInfo';

export class Museum extends BasicInfo {
  constructor(name: string, introduction: string, image: string, description: string, id: string) {
    super(name, introduction, image, description, id);
  }

  public static of(basicInfo: BasicInfo) {
    return new Museum(basicInfo.name, basicInfo.introduction, basicInfo.image, basicInfo.description, basicInfo.id);
  }
}
