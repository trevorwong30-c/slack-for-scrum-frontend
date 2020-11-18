import { Action, ThunkAction } from '@reduxjs/toolkit';
import { Task } from 'interfaces';
import { RootStateOrAny } from 'react-redux';
import { updateTask } from 'services/taskServices';
import { loadAllTasks } from './loadAllTasks';
export const UPDATE_TASK_DETAIL_START = "UPDATE_TASK_DETAIL_START";
export const UPDATE_TASK_DETAIL_SUCCESS = 'UPDATE_TASK_DETAIL_SUCCESS';
export const UPDATE_TASK_DETAIL_FAIL = 'UPDATE_TASK_DETAIL_FAIL';

export const updateTaskDetail = (data:Task): ThunkAction<
  void,
  RootStateOrAny,
  unknown,
  Action
> => {
  return async (dispatch) => {
    try {
      const res:any = await updateTask(data);
      if (res && res.success) {
        dispatch(loadAllTasks());
        dispatch(updateTaskDetailSuccess(data));
      } else {
        dispatch(updateTaskDetailFailure(res.message));
      }
    } catch (err) {
      dispatch(updateTaskDetailFailure(err));
    }
  };
};

export const updateTaskDetailStart = (list: any) => {
  return {
    type: UPDATE_TASK_DETAIL_START
  };
};

export const updateTaskDetailSuccess = (task: Task) => {
  return {
    type: UPDATE_TASK_DETAIL_SUCCESS,
    task
  };
};

export const updateTaskDetailFailure = (error: any) => {
  return {
    type: UPDATE_TASK_DETAIL_FAIL,
    error
  };
};
