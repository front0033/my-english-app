import ApiClient from './ApiClient';
import {IUserData} from './types';

const AUTH_API_URL = 'words/api/auth';

const authApi = {
  login: (boby: IUserData) => ApiClient.post(AUTH_API_URL, boby),
};

export default authApi;
