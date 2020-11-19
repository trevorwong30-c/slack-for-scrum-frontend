import { ThunkAction } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';
import { addTaskIdToSprint } from '../../services/sprintServices';

export const ADD_TASK_ID_TO_SPRINT_SUCCESS = 'ADD_TASK_ID_TO_SPRINT_SUCCESS';
export const ADD_TASK_ID_TO_SPRINT_FAILED = 'ADD_TASK_ID_TO_SPRINT_FAILED';

interface AddTaskIdToSprintAction {
  type: string;
  taskIds?: number[];
  msg?: string;
}
export const addTaskIdToSprintThunk = (
  sprintId: number,
  taskId: number
): ThunkAction<void, RootStateOrAny, unknown, AddTaskIdToSprintAction> => {
  return async (dispatch) => {
    const res = await addTaskIdToSprint(sprintId, taskId);
    if (res && res.success) {
      console.log('addTaskIdToSprintThunk', res.payload.taskIds);
      const taskIds = res.payload.taskIds;
      dispatch(addTaskIdToSprintSuccess(taskIds));
    } else {
      dispatch(addTaskIdToSprintFailed(res.message));
    }
  };
};

const addTaskIdToSprintSuccess = (taskIds: number[]) => ({
  type: ADD_TASK_ID_TO_SPRINT_SUCCESS,
  taskIds
});

const addTaskIdToSprintFailed = (msg: string) => ({
  type: ADD_TASK_ID_TO_SPRINT_FAILED,
  msg
});
