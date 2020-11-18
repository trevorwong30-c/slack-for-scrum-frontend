import { ThunkAction } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';
import { createNewSprint } from '../../services/sprintServices';
import { getAllSprintsThunk } from '../actions/getAllSprintsAction';

export const CREATE_NEW_SPRINT_SUCCESS = 'CREATE_NEW_SPRINT_SUCCESS';
export const CREATE_NEW_SPRINT_FAILED = 'CREATE_NEW_SPRINT_FAILED';
export const RESET_CREATE_NEW_SPRINT = 'RESET_CREATE_NEW_SPRINT';

interface CreateNewSprintAction {
  type: string;
  msg?: string;
}

export const createNewSprintThunk = (
  startDate: string,
  endDate: string
): ThunkAction<void, RootStateOrAny, unknown, CreateNewSprintAction> => {
  return async (dispatch) => {
    try {
      const res = await createNewSprint(startDate, endDate);
      if (res && res.success) {
        console.log('createNewSprintThunk', res);
        dispatch(createNewSprintSuccess());
        //refresh all sprints
        dispatch(getAllSprintsThunk());
      } else {
        dispatch(createNewSprintFailed(res.message));
      }
    } catch (err) {
      console.log('createNewSprintThunk failed with error: ', err);
      dispatch(createNewSprintFailed(err.message));
    }
  };
};

const createNewSprintSuccess = () => ({
  type: CREATE_NEW_SPRINT_SUCCESS
});

const createNewSprintFailed = (msg: string) => ({
  type: CREATE_NEW_SPRINT_FAILED,
  msg
});

export const resetCreateNewSprint = () => ({
  type: RESET_CREATE_NEW_SPRINT
});
