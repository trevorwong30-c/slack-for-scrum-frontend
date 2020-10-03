import { Action, ThunkAction } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';
import mockRequirementList from '../../mockReponses/requirement/requirementList.json';
export const LOAD_REQUIREMENT_LIST_SUCCESS = 'LOAD_REQUIREMENT_LIST_SUCCESS';
export const LOAD_REQUIREMENT_LIST_FAIL = 'LOAD_REQUIREMENT_LIST_FAIL';

export const loadRequirementList = (): ThunkAction<
  void,
  RootStateOrAny,
  unknown,
  Action
> => {
  return (dispatch) => {
    // TODO:: Should integrate with axios
    // const payload = require('../mockResponses/searchUserByKeyword.json');
    const payload = mockRequirementList;
    dispatch(loadRequirementListSuccess(payload.list));

    // return axios.get(LOAD_REQUIREMENT_LIST_ENDPOINT).then((response) => {
    //   console.log(`response`, response);
    //   dispatch(loadRequirementListSuccess(response.list));
    // });
  };
};

export const loadRequirementListSuccess = (list: any) => {
  return {
    type: LOAD_REQUIREMENT_LIST_SUCCESS,
    list
  };
};

export const loadRequirementListFailure = (error: any) => {
  return {
    type: LOAD_REQUIREMENT_LIST_FAIL,
    error
  };
};
