import response from '../../mockReponses/requirement/requirementList.json';
import { API_URL, MOCK_ENABLED } from '../../env.json';
import axios from 'axios';
import {
  mockGetTasksWithReqId,
  mockGetAllTasks,
  mockPostSuccess
} from '../mockHelper';
import { API_END_POINTS } from '../../constants';
import { Task } from 'interfaces';
import moment from 'moment';

export const LOAD_REQUIREMENT_LIST_ENDPOINT = '/requirement/list';

//axios instance
const instance = axios.create({
  baseURL: API_URL,
  timeout: 20000
});

// enable or disable mock data
const mockEnabled = MOCK_ENABLED;

//****create a mock function in mockHelper to mock the response****

export const getAllTasks = async () => {
  //TODO use axios to call API
  try {
    mockGetAllTasks(instance, mockEnabled);

    const res = await instance.get(API_END_POINTS.GET_ALL_TASKS);
    if (res) {
      return { success: true, payload: res.data };
    } else {
      return { success: false, message: 'cannot get tasks' };
    }
  } catch (err) {
    console.log(err);
    return { success: false, message: err.message };
  }
};

export const getTasksWithReqId = async (reqId: number) => {
  //TODO use axios to call API
  try {
    mockGetTasksWithReqId(instance, mockEnabled);
    const url = API_END_POINTS.GET_TASKS_WITH_REQ_ID.replace(
      ':requirementId',
      reqId + ''
    );

    console.log('getTasksWithReqId url ', url);
    const res = await instance.get(url);
    if (res) {
      return { success: true, payload: res.data };
    } else {
      return { success: false, message: 'cannot get tasks with req id' };
    }
  } catch (err) {
    console.log(err);
    return { success: false, message: err.message };
  }
};

export const getTasksWithSprintId = async (sprintId: number) => {
  //TODO use axios to call API
  try {
    mockGetTasksWithReqId(instance, mockEnabled);
    const url = API_END_POINTS.GET_TASKS_WITH_SPRINT_ID.replace(
      ':sprintId',
      sprintId + ''
    );

    console.log('getTasksWithSprintId url ', url);
    const res = await instance.get(url);
    if (res) {
      return { success: true, payload: res.data };
    } else {
      return { success: false, message: 'cannot get tasks with sprint id' };
    }
  } catch (err) {
    console.log(err);
    return { success: false, message: err.message };
  }
};

export const createNewTask = async (task: Task) => {
  try {
    mockPostSuccess(instance, mockEnabled);
    const data = {
      newTaskInfo: {
        requirementId: task.reqId,
        title: task.title,
        description: task.description,
        estimatedHour: task.estimatedHour,
        remainingHour: task.remainingHour,
        assignee: task.assigneeId,
        endAt: task.endAt?.toDateString(),
        sprintId: task.sprintId
      }
    };

    const res = await instance.post(API_END_POINTS.POST_NEW_TASKS, data);
    if (res) {
      return { success: true };
    } else {
      return { success: false, message: 'cannot post new task' };
    }
  } catch (err) {
    console.log(err);
    return { success: false, message: err.message };
  }
};

export const updateTask = async (task:Task) => {

  if (!task || !task.id) {
    return { success: false, message: 'cannot get tasks with sprint id' };
  }

  //TODO use axios to call API
  try {
    const url = API_END_POINTS.PUT_TASK.replace(
      ':taskId',
      task.id.toString()
    );

    console.log('updateTask url ', url);
    const res = await instance.put(url, {
      "updateTaskInfo": {
        "Req_id": task.reqId,
        "Title": task.title,
        "description": task.description,
        "estimatedHour": task.estimatedHour,
        "remainingHour": task.remainingHour,
        "historical_spent": task.historicalSpent,
        "status": task.status,
        "assignee": task.assigneeId,
        "comments_history": task.commentsHistory,
        "endAt": moment(task.endAt).format("YYYY-MM-DD")
      }
    });
    if (res) {
      return { success: true, payload: res.data };
    } else {
      return { success: false, message: 'cannot get tasks with sprint id' };
    }
  } catch (err) {
    console.log(err);
    return { success: false, message: err.message };
  }
};
