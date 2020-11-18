import {
  ADD_TASK_ID_TO_SPRINT_FAILED,
  ADD_TASK_ID_TO_SPRINT_SUCCESS
} from '../actions/addTaskIdToSprintAction';

const initialState = {
  msg: '',
  taskIds: []
};

const addTaskIdToSprintReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_TASK_ID_TO_SPRINT_SUCCESS: {
      return { ...state, taskIds: action.taskIds };
    }
    case ADD_TASK_ID_TO_SPRINT_FAILED: {
      return { ...state, msg: action.msg };
    }
    default: {
      return { ...state };
    }
  }
};

export default addTaskIdToSprintReducer;
