import {
  CREATE_NEW_TASK_SUCCESS,
  CREATE_NEW_TASK_FAILED,
  RESET_CREATE_NEW_TASK_STATUS
} from '../actions/createNewTask';

import { ApiStatus } from '../../enums';

const initialState = {
  msg: '',
  apiStatus: ApiStatus.NotStarted
};

const createNewTaskReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CREATE_NEW_TASK_SUCCESS: {
      return { ...state, apiStatus: ApiStatus.Success };
    }
    case CREATE_NEW_TASK_FAILED: {
      return { ...state, apiStatus: ApiStatus.Failed, msg: action.error };
    }
    case RESET_CREATE_NEW_TASK_STATUS: {
      return { ...state, apiStatus: ApiStatus.NotStarted, msg: '' };
    }
    default: {
      return { ...state };
    }
  }
};

export default createNewTaskReducer;
