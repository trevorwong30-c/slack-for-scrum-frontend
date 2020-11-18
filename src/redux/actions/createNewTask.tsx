import { ThunkAction } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';
import { Task } from '../../interfaces';
import { createNewTask as postNewTask } from '../../services/taskServices';

export const CREATE_NEW_TASK = 'CREATE_NEW_TASK';
export const CREATE_NEW_TASK_SUCCESS = 'CREATE_NEW_TASK_SUCCESS';
export const CREATE_NEW_TASK_FAILED = 'CREATE_NEW_TASK_FAILED';
export const RESET_CREATE_NEW_TASK_STATUS = 'RESET_CREATE_NEW_TASK_STATUS';

export interface CreateNewTaskAction {
  type: string;
  error?: string;
}

export const createNewTaskThunk = (
  reqId: number,
  task: Task
): ThunkAction<void, RootStateOrAny, unknown, CreateNewTaskAction> => {
  return async (dispatch) => {
    try {
      const res = await postNewTask(reqId, task);
      if (res && res.success) {
        console.log('createNewTaskThunk', res);
        dispatch(createNewTaskSuccess());
      } else {
        dispatch(createNewTaskFailed(res.message));
      }
    } catch (err) {
      console.log('createNewTask failed with error: ', err);
      dispatch(createNewTaskFailed(err.message));
    }
  };
};

export const resetCreateNewTaskStatus = () => ({
  type: RESET_CREATE_NEW_TASK_STATUS
});

export const createNewTaskSuccess = () => ({
  type: CREATE_NEW_TASK_SUCCESS
});

export const createNewTaskFailed = (msg: string) => ({
  type: CREATE_NEW_TASK_FAILED,
  error: msg
});
