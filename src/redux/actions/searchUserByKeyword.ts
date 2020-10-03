import { Action, ThunkAction } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';
import searchUserByKeywordList from '../../mockReponses/user/searchUserByKeyword.json';

export const SEARCH_USER_BY_KEYWORD_START = 'SEARCH_USER_BY_KEYWORD_START';
export const SEARCH_USER_BY_KEYWORD_SUCCESS = 'SEARCH_USER_BY_KEYWORD_SUCCESS';
export const SEARCH_USER_BY_KEYWORD_FAIL = 'SEARCH_USER_BY_KEYWORD_FAIL';

export const searchUserByKeyword = (keyword:string): ThunkAction<
    void,
    RootStateOrAny,
    unknown,
    Action
    > => {
    return (dispatch) => {

        dispatch(searchUserByKeywordStart());

        // TODO:: Should integrate with axios
        // const payload = require('../mockResponses/searchUserByKeyword.json');
        const payload = searchUserByKeywordList;

        dispatch(searchUserByKeywordSuccess(payload.list))

        // return axios.get(LOAD_REQUIREMENT_LIST_ENDPOINT).then((response) => {
        //   console.log(`response`, response);
        //   dispatch(loadRequirementListSuccess(response.list));
        // });
    };
};

export const searchUserByKeywordStart = () => {
    return {
        type: SEARCH_USER_BY_KEYWORD_START
    }
};

export const searchUserByKeywordSuccess = (list: any) => {
    return {
        type: SEARCH_USER_BY_KEYWORD_SUCCESS,
        list
    };
};

export const searchUserByKeywordFail = (error: any) => {
    return {
        type: SEARCH_USER_BY_KEYWORD_FAIL,
        error
    };
};
