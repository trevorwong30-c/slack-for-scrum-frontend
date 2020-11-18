import {
  CREATE_NEW_SPRINT_FAILED,
  CREATE_NEW_SPRINT_SUCCESS
} from '../actions/createNewSprintAction';

const initialState = {
  msg: ''
};

const createNewSprintReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CREATE_NEW_SPRINT_FAILED: {
      return { ...state, msg: action.msg };
    }
    case CREATE_NEW_SPRINT_SUCCESS:
    default: {
      return { ...state };
    }
  }
};

export default createNewSprintReducer;
