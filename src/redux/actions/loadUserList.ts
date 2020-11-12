import { Action, ThunkAction } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';
import { getAllUsers } from '../../services/userServices';
import { parseUsersResponse } from "../../parsers/usersParser";

export const LOAD_USER_LIST_START = 'LOAD_USER_LIST_START';
export const LOAD_USER_LIST_SUCCESS = 'LOAD_USER_LIST_SUCCESS';
export const LOAD_USER_LIST_FAIL = 'LOAD_USER_LIST_FAIL';

export const loadUserList = (): ThunkAction<
    void,
    RootStateOrAny,
    unknown,
    Action
    > => {
    return async (dispatch) => {
        try {
            const res = await getAllUsers();
            if (res && res.success) {
              const users = parseUsersResponse(res.payload);
              dispatch(loadUserListSuccess(users));
            } else {
              dispatch(loadUserListFail(res.message));
            }
          } catch (err) {
            dispatch(loadUserListFail(err));
          }
    };
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
