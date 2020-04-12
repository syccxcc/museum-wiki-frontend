import {BasicInfo} from '../models/BasicInfo';

export interface BasicInfoService {
  getWithId(id: string): Promise<BasicInfo>;
}
