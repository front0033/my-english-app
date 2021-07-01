import {UserState} from './user/types';
import {IErrorsData} from './apiErrors/types';

export interface State {
  apiErrors: IErrorsData;
  user: UserState;
}
