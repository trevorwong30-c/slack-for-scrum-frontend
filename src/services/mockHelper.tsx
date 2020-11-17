import { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import MOCK_GET_ALL_REQUIREMENTS from '../mockReponses/requirement/requirementList.json';
import MOCK_GET_TASK_REQ_1 from '../mockReponses/task/getTasksWithReqIdMock_1.json';
import MOCK_GET_TASK_REQ_2 from '../mockReponses/task/getTasksWithReqIdMock_2.json';
import MOCK_GET_TASK_REQ_3 from '../mockReponses/task/getTasksWithReqIdMock_3.json';
import MOCK_GET_ALL_TASKS from '../mockReponses/task/getAllTasksMock.json';
import MOCK_GET_ALL_USERS from "../mockReponses/user/getAllUsersMock.json";
import { API_END_POINTS } from '../constants';

export const mockGetAllRequirements = (
  instance: AxiosInstance,
  mockEnabled: boolean
) => {
  if (mockEnabled) {
    const mock = new MockAdapter(instance);
    mock
      .onGet(API_END_POINTS.GET_ALL_REQUIREMENTS)
      .reply(200, JSON.stringify(MOCK_GET_ALL_REQUIREMENTS));
  }
};

export const mockGetAllTasks = (
  instance: AxiosInstance,
  mockEnabled: boolean
) => {
  if (mockEnabled) {
    const mock = new MockAdapter(instance);
    mock
      .onGet(API_END_POINTS.GET_ALL_TASKS)
      .reply(200, JSON.stringify(MOCK_GET_ALL_TASKS));
  }
};

export const mockGetAllUsers = (
  instance: AxiosInstance,
  mockEnabled: boolean
) => {
  if (mockEnabled) {
    const mock = new MockAdapter(instance);
    mock
      .onGet(API_END_POINTS.GET_ALL_USERS)
      .reply(200, JSON.stringify(MOCK_GET_ALL_USERS));
  }
};

export const mockGetTasksWithReqId = (
  instance: AxiosInstance,
  mockEnabled: boolean
) => {
  if (mockEnabled) {
    const mock = new MockAdapter(instance);
    const url1 = API_END_POINTS.GET_TASKS_WITH_REQ_ID.replace(
      ':requirementId',
      '1'
    );
    const url2 = API_END_POINTS.GET_TASKS_WITH_REQ_ID.replace(
      ':requirementId',
      '2'
    );
    const url3 = API_END_POINTS.GET_TASKS_WITH_REQ_ID.replace(
      ':requirementId',
      '3'
    );

    mock.onGet(url1).reply(200, JSON.stringify(MOCK_GET_TASK_REQ_1));

    mock.onGet(url2).reply(200, JSON.stringify(MOCK_GET_TASK_REQ_2));

    mock.onGet(url3).reply(200, JSON.stringify(MOCK_GET_TASK_REQ_3));
  }
};

export const mockGetTasksWithSprintId = (
  instance: AxiosInstance,
  mockEnabled: boolean
) => {
  if (mockEnabled) {
    const mock = new MockAdapter(instance);
    const url1 = API_END_POINTS.GET_TASKS_WITH_SPRINT_ID.replace(
      ':sprintId',
      '1'
    );
    const url2 = API_END_POINTS.GET_TASKS_WITH_SPRINT_ID.replace(
      ':sprintId',
      '2'
    );
    const url3 = API_END_POINTS.GET_TASKS_WITH_SPRINT_ID.replace(
      ':sprintId',
      '3'
    );

    //   mock.onGet(url1).reply(200, JSON.stringify(MOCK_GET_TASK_REQ_1));
    //   mock.onGet(url2).reply(200, JSON.stringify(MOCK_GET_TASK_REQ_2));
    //   mock.onGet(url3).reply(200, JSON.stringify(MOCK_GET_TASK_REQ_3));
    mock.onGet(url1).reply(200, [1, 2]);
    mock.onGet(url2).reply(200, [3, 4]);
    mock.onGet(url3).reply(200, []);
  }
};

export const mockPostSuccess = (
  instance: AxiosInstance,
  mockEnabled: boolean
) => {
  if (mockEnabled) {
    const mock = new MockAdapter(instance);

    const createNewTaskUrl = API_END_POINTS.POST_NEW_TASKS;
    mock.onPost(createNewTaskUrl).reply(200, { message: 'success' });
  }
};
