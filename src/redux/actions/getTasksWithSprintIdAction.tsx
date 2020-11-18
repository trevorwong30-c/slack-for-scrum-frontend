import { ThunkAction } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';
import { getTasksWithSprintId } from '../../services/taskServices';

export const GET_TASKS_WITH_SPRINT_ID_SUCCESS =
  'GET_TASKS_WITH_SPRINT_ID_SUCCESS';
export const GET_TASKS_WITH_SPRINT_ID_FAILED =
  'GET_TASKS_WITH_SPRINT_ID_FAILED';

interface GetTasksWithSprintIdAction {
  type: string;
  taskIds?: number[];
  msg?: string;
}

export const getTasksWithSprintIdThunk = (
  sprintId: number
): ThunkAction<void, RootStateOrAny, unknown, GetTasksWithSprintIdAction> => {
  return async (dispatch) => {
    try {
      const res = await getTasksWithSprintId(sprintId);
      if (res && res.success) {
        console.log('getTasksWithSprintIdThunk res.payload ', res.payload);
        const taskIds = res.payload;
        dispatch(getTasksWithSprintIdSuccess(taskIds));
      } else {
        dispatch(getTasksWithSprintIdFailed(res.message));
      }
    } catch (err) {
      dispatch(getTasksWithSprintIdFailed(err.message));
    }
  };
};

export const getTasksWithSprintIdSuccess = (taskIds: number[]) => ({
  type: GET_TASKS_WITH_SPRINT_ID_SUCCESS,
  taskIds
});

export const getTasksWithSprintIdFailed = (msg: string) => ({
  type: GET_TASKS_WITH_SPRINT_ID_SUCCESS,
  msg
});
