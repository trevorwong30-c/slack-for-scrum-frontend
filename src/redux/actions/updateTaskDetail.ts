import { Action, ThunkAction } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';
export const UPDATE_TASK_DETAIL_START = "UPDATE_TASK_DETAIL_START";
export const UPDATE_TASK_DETAIL_SUCCESS = 'UPDATE_TASK_DETAIL_SUCCESS';
export const UPDATE_TASK_DETAIL_FAIL = 'UPDATE_TASK_DETAIL_FAIL';

export const updateTaskDetail = (): ThunkAction<
  void,
  RootStateOrAny,
  unknown,
  Action
> => {
  return (dispatch) => {

    // dispatch(updateTaskDetailStart());

    // TODO:: Should integrate with axios
    // const payload = require('../mockResponses/searchUserByKeyword.json');
    // const payload = mockRequirementList;
    // dispatch(updateTaskDetailSuccess(payload.list));

    // return axios.get(LOAD_REQUIREMENT_LIST_ENDPOINT).then((response) => {
    //   console.log(`response`, response);
    //   dispatch(loadRequirementListSuccess(response.list));
    // });
  };
};

export const updateTaskDetailStart = (list: any) => {
  return {
    type: UPDATE_TASK_DETAIL_START
  };
};

export const updateTaskDetailSuccess = (list: any) => {
  return {
    type: UPDATE_TASK_DETAIL_SUCCESS,
    list
  };
};

export const updateTaskDetailFailure = (error: any) => {
  return {
    type: UPDATE_TASK_DETAIL_FAIL,
    error
  };
};
