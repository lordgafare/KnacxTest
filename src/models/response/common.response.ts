import { StatusModel } from '../statusCode.model';

export interface ResponseModel {
  status: StatusModel;
  data: any;
}
