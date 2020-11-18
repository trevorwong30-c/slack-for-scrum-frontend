import { Action, ThunkAction } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';
import { User } from '../../interfaces';
import { updateUser } from '../../services/userServices';
export const UPDATE_USER_START = "UPDATE_USER_START";
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL';

export const updateAllUsers = (users:Array<User>): ThunkAction<
  void,
  RootStateOrAny,
  unknown,
  Action
> => {
  return async (dispatch) => {
    
    for(let user of users) {
      try {
        await updateUser(user);
        // if (res && res.success) {
        //   dispatch(updateUserSuccess(users));
        // } else {
        //   dispatch(updateUserFail(res.message));
        // }
      } catch (err) {
        // dispatch(updateUserFail(err));
      }
    }
    
    dispatch(updateUserSuccess(users))

  };
};

export const updateUserStart = (list: any) => {
  return {
    type: UPDATE_USER_START
  };
};

export const updateUserSuccess = (list: any) => {
  return {
    type: UPDATE_USER_SUCCESS,
    list
  };
};

export const updateUserFail = (error: any) => {
  return {
    type: UPDATE_USER_FAIL,
    error
  };
};
