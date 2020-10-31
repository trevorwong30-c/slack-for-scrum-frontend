import { Action, ThunkAction } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';
import userListResponse from '../../mockReponses/user/loadUserList.json';

export const LOAD_USER_LIST_START = 'LOAD_USER_LIST_START';
export const LOAD_USER_LIST_SUCCESS = 'LOAD_USER_LIST_SUCCESS';
export const LOAD_USER_LIST_FAIL = 'LOAD_USER_LIST_FAIL';

export const loadUserList = (): ThunkAction<
    void,
    RootStateOrAny,
    unknown,
    Action
    > => {
    return (dispatch) => {

        dispatch(loadUserListStart());

        // TODO:: Should integrate with axios
        // const payload = require('../mockResponses/searchUserByKeyword.json');
        const payload = userListResponse;

        dispatch(loadUserListSuccess(payload.list))

        // return axios.get(LOAD_REQUIREMENT_LIST_ENDPOINT).then((response) => {
        //   console.log(`response`, response);
        //   dispatch(loadRequirementListSuccess(response.list));
        // });
    };
};

export const loadUserListStart = () => {
    return {
        type: LOAD_USER_LIST_START
    }
};

export const loadUserListSuccess = (list: any) => {
    return {
        type: LOAD_USER_LIST_SUCCESS,
        list
    };
};

export const loadUserListFail = (error: any) => {
    return {
        type: LOAD_USER_LIST_FAIL,
        error
    };
};
