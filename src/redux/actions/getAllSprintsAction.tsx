import { ThunkAction } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';
import { Sprint } from '../../interfaces';
import { getAllSprints } from '../../services/sprintServices';
import { parseSprintsResponse } from '../../parsers/sprintParser';
export const GET_ALL_SPRINTS_SUCCESS = 'GET_ALL_SPRINTS_SUCCESS';
export const GET_ALL_SPRINTS_FAILED = 'GET_ALL_SPRINTS_FAILED';

export interface GetAllSprintsAction {
  type: string;
  sprints?: Sprint[];
  msg?: string;
}

export const getAllSprintsThunk = (): ThunkAction<
  void,
  RootStateOrAny,
  unknown,
  GetAllSprintsAction
> => {
  return async (dispatch) => {
    try {
      const res = await getAllSprints();
      if (res && res.success) {
        const sprints = parseSprintsResponse(res.payload);
        dispatch(getAllSprintsSuccess(sprints));
      } else {
        dispatch(getAllSprintsFailed(res.message));
      }
    } catch (err) {
      dispatch(getAllSprintsFailed(err));
    }
  };
};

export const getAllSprintsSuccess = (sprints: Sprint[]) => ({
  type: GET_ALL_SPRINTS_SUCCESS,
  sprints
});

export const getAllSprintsFailed = (msg: string) => ({
  type: GET_ALL_SPRINTS_SUCCESS,
  msg
});
