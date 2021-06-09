import ApiClient from './ApiClient';
import {IWordDTO} from './types';

const API_URL = 'words/api/word';

const wordApi = {
  add: (boby: IWordDTO) => ApiClient.post(API_URL, boby),
  getByDictionaryName: (name: string) => ApiClient.get(`${API_URL}/byDictionary`, {params: {name}}),
};

export default wordApi;
