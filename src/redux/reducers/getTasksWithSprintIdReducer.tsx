import {
  GET_TASKS_WITH_SPRINT_ID_FAILED,
  GET_TASKS_WITH_SPRINT_ID_SUCCESS
} from '../actions/getTasksWithSprintIdAction';

const initialState = {
  msg: '',
  taskIds: []
};

const getTasksWithSprintIdReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_TASKS_WITH_SPRINT_ID_SUCCESS: {
      return { ...state, taskIds: action.taskIds };
    }
    case GET_TASKS_WITH_SPRINT_ID_FAILED: {
      return { ...state, msg: action.msg };
    }
    default: {
      return { ...state };
    }
  }
};

export default getTasksWithSprintIdReducer;
