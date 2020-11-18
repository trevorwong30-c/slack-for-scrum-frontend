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

export const createNewSprint = async (startDate: string, endDate: string) => {
  try {
    const data = {
      newSprintInfo: {
        create_at: startDate,
        endAt: endDate
      }
    };

    console.log('new sprint data: ', data);
    const res = await instance.post(API_END_POINTS.POST_NEW_SPRINT, data);
    if (res) {
      console.log('createNewSprint', res);
      return { success: true };
    }

    return { success: false, message: 'Cannot get response' };
  } catch (err) {
    console.log('createNewSprint failed with error: ', err);
    return { success: false, message: err.message };
  }
};

export const addTaskIdToSprint = async (sprintId: number, taskId: number) => {
  try {
    const data = {
      updateSprintInfo: {
        taskId: taskId
      }
    };

    let url = API_END_POINTS.PUT_SPRINT.replace(':sprintId', sprintId + '');
    const res = await instance.put(url, data);

    if (res) {
      console.log('addTaskIdToSprint', res.data);
      return { success: true, payload: res.data };
    }

    return { success: false, message: 'Cannot get response' };
  } catch (err) {
    console.log('addTaskIdToSprint failed with error: ', err);
    return { success: false, message: err.message };
  }
};
