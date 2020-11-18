import {
  GET_ALL_SPRINTS_SUCCESS,
  GET_ALL_SPRINTS_FAILED
} from '../actions/getAllSprintsAction';

const initialState = {
  sprints: [],
  msg: ''
};

const getAllSprintsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_ALL_SPRINTS_SUCCESS: {
      return { ...state, sprints: action.sprints };
    }
    case GET_ALL_SPRINTS_FAILED: {
      return { ...state, msg: '' };
    }
    default: {
      return { ...state };
    }
  }
};

export default getAllSprintsReducer;
