import { ThunkAction } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';
import { Task } from '../../interfaces';
import { getTasksWithReqId as getTasks } from '../../services/taskServices';
import { parseTasksReponse } from '../../parsers/tasksParser';

export const GET_TASKS_WITH_REQ_ID = 'GET_TASKS_WITH_REQ_ID';
export const GET_TASKS_WITH_REQ_ID_SUCCESS = 'GET_TASKS_WITH_REQ_ID_SUCCESS';
export const GET_TASKS_WITH_REQ_ID_FAILED = 'GET_TASKS_WITH_REQ_ID_FAILED';

export interface GetTasksWithReqIdAction {
  type: string;
  tasks?: Task[];
  msg?: string;
}

export const getTasksWithReqId = (
  reqId: number
): ThunkAction<void, RootStateOrAny, unknown, GetTasksWithReqIdAction> => {
  return async (dispatch) => {
    try {
      const res = await getTasks(reqId);
      if (res) {
        const tasks = parseTasksReponse(res);
        dispatch(getTasksWithReqIdSuccess(tasks));
      }
    } catch (err) {
      dispatch(getTasksWithReqIdFailed(err));
    }
  };
};

export const getTasksWithReqIdSuccess = (tasks: Task[]) => ({
  type: GET_TASKS_WITH_REQ_ID_SUCCESS,
  tasks
});

export const getTasksWithReqIdFailed = (error: any) => ({
  type: GET_TASKS_WITH_REQ_ID_FAILED,
  msg: error.message
});
