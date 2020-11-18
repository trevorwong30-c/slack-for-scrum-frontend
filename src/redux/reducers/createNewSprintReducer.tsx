import { ApiStatus } from 'enums';
import {
  CREATE_NEW_SPRINT_FAILED,
  CREATE_NEW_SPRINT_SUCCESS,
  RESET_CREATE_NEW_SPRINT
} from '../actions/createNewSprintAction';

const initialState = {
  msg: '',
  apiStatus: ApiStatus.NotStarted
};

const createNewSprintReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CREATE_NEW_SPRINT_FAILED: {
      return { ...state, msg: action.msg, apiStatus: ApiStatus.Failed };
    }
    case CREATE_NEW_SPRINT_SUCCESS: {
      return { ...state, apiStatus: ApiStatus.Success };
    }
    case RESET_CREATE_NEW_SPRINT:
    default: {
      return { ...state, apiStatus: ApiStatus.NotStarted };
    }
  }
};

export default createNewSprintReducer;
