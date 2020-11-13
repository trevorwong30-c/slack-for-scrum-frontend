import { ThunkAction } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';
import { Task } from '../../interfaces';
import { getAllTasks } from '../../services/taskServices';
import { parseTasksReponse } from '../../parsers/tasksParser';

export const LOAD_ALL_TASKS = 'LOAD_ALL_TASKS';
export const LOAD_ALL_TASKS_SUCCESS = 'LOAD_ALL_TASKS_SUCCESS';
export const LOAD_ALL_TASKS_FAILED = 'LOAD_ALL_TASKS_FAILED';

export interface LoadAllTasksAction {
  type: string;
  tasks?: Task[];
  msg?: string;
}

export const loadAllTasks = (): ThunkAction<void, RootStateOrAny, unknown, LoadAllTasksAction> => {
  return async (dispatch) => {
    try {
      const res = await getAllTasks();
      if (res && res.success) {
        const tasks = parseTasksReponse(res.payload);
        dispatch(loadAllTasksSuccess(tasks));
      } else {
        dispatch(loadAllTasksFailed(res.message));
      }
    } catch (err) {
      dispatch(loadAllTasksFailed(err));
    }
  };
};

export const loadAllTasksSuccess = (tasks: Task[]) => ({
  type: LOAD_ALL_TASKS_SUCCESS,
  tasks
});

export const loadAllTasksFailed = (error: any) => ({
  type: LOAD_ALL_TASKS_FAILED,
  msg: error.message
});
