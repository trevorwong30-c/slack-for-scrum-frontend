import { ThunkAction } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';
import { Task } from '../../interfaces';
import { createNewTask } from '../../services/taskServices';

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
    const res = await createNewTask(reqId, task);
    if (res && res.success) {
      console.log('createNewTaskThunk', res);
      dispatch(createNewTaskSuccess());
    } else {
      dispatch(createNewTaskFailed(res.message));
    }
  };
};

export const createNewTaskSuccess = () => ({
  type: CREATE_NEW_TASK_SUCCESS
});

export const createNewTaskFailed = (msg: string) => ({
  type: CREATE_NEW_TASK_FAILED,
  error: msg
});
