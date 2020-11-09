import {
  GET_TASKS_WITH_REQ_ID_SUCCESS,
  GET_TASKS_WITH_REQ_ID_FAILED
} from '../actions/getTasksWithReqId';

const initialState = {
  msg: '',
  tasks: []
};

const getTaskWithReqIdReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_TASKS_WITH_REQ_ID_SUCCESS: {
      return { ...state, tasks: action.tasks };
    }
    case GET_TASKS_WITH_REQ_ID_FAILED: {
      return { ...state, msg: action.msg };
    }
    default: {
      return { ...state };
    }
  }
};

export default getTaskWithReqIdReducer;
