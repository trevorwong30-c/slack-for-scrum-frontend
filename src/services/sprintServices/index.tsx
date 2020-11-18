import response from '../../mockReponses/requirement/requirementList.json';
import { API_URL } from '../../env.json';
import axios from 'axios';
import { API_END_POINTS } from '../../constants';

export const LOAD_REQUIREMENT_LIST_ENDPOINT = '/requirement/list';

//axios instance
const instance = axios.create({
  baseURL: API_URL,
  timeout: 20000
});

export const getAllSprints = async () => {
  try {
    const res = await instance.get(API_END_POINTS.GET_ALL_SPRINTS);
    if (res) {
      console.log('getAllSprints', res.data);
      return { success: true, payload: res.data };
    }

    return { success: false, message: 'Cannot get response' };
  } catch (err) {
    console.log('get All sprint failed with error: ', err);
    return { success: false, message: err.message };
  }
};