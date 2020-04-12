import {BasicInfo} from './BasicInfo';

export class Museum extends BasicInfo {
  constructor(name: string, introduction: string, description: string, id: string) {
    super(name, introduction, description, id);
  }

  public static of(basicInfo: BasicInfo) {
    return new Museum(basicInfo.name, basicInfo.introduction, basicInfo.description, basicInfo.id);
  }
}
