import axios from 'axios';

export const LOAD_REQUIREMENT_LIST_SUCCESS = "LOAD_REQUIREMENT_LIST_SUCCESS";
export const LOAD_REQUIREMENT_LIST_FAIL = "LOAD_REQUIREMENT_LIST_FAIL";

export const loadRequirementList = () => {
  return dispatch => {
    // TODO:: Should integrate with axios
    const payload = require("../mockResponses/requirementList.json");
    dispatch(loadRequirementListSuccess(payload.list));

    // return axios.get(LOAD_REQUIREMENT_LIST_ENDPOINT).then((response) => {
    //   console.log(`response`, response);
    //   dispatch(loadRequirementListSuccess(response.list));
    // });
  }
}

export const loadRequirementListSuccess = (list) => {
  return {
    type: LOAD_REQUIREMENT_LIST_SUCCESS,
    list
  };
}

export const loadRequirementListFailure = (error) => {
  return {
    type: LOAD_REQUIREMENT_LIST_FAIL,
    error
  };
}
