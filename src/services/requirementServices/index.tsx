import response from '../../mockReponses/requirement/requirementList.json';
import { API_URL, MOCK_ENABLED } from '../../env.json';
import axios from 'axios';
import { mockGetAllRequirements } from '../mockHelper';
import { API_END_POINTS } from '../../constants';

export const LOAD_REQUIREMENT_LIST_ENDPOINT = '/requirement/list';

//axios instance
const instance = axios.create({
  baseURL: API_URL,
  timeout: 20000
});

// enable or disable mock data
const mockEnabled = MOCK_ENABLED;

export const getRequirementList = async () => {
  //TODO use axios to call API
  try {
    mockGetAllRequirements(instance, mockEnabled);

    const res = await instance.get(API_END_POINTS.GET_ALL_REQUIREMENTS);
    if (res) {
      return { success: true, payload: res.data };
    }

    return { success: false, message: 'Cannot get response' };
  } catch (err) {
    console.log(err);
    return { success: false, message: err.message };
  }
};
