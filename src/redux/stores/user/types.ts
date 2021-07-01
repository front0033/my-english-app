import {Action} from 'redux';
import LoadStatuses from '../loadStatuses';

export interface IAuthInfo {
  access_token?: string;
  expiry?: string;
  refresh_token?: string;
  token_type?: string;
  name?: string;
}

export interface UserState {
  info: IAuthInfo;
  loadStatus: LoadStatuses;
  isAuthenticated: boolean;
  isGranted: boolean;
  role: string;
}

export interface setUserInfoAction extends Action {
  type: string;
  payload?: any;
}

export type UserActions = setUserInfoAction;
