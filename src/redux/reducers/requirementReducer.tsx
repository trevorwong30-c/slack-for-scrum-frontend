import {
  LOAD_REQUIREMENT_LIST_SUCCESS,
  LOAD_REQUIREMENT_LIST_FAIL
} from '../actions/loadRequirementList';

const initialState = {
  list: [],
  error: ''
};

const requirementReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOAD_REQUIREMENT_LIST_SUCCESS:
      return {
        ...state,
        list: action.list
      };
    case LOAD_REQUIREMENT_LIST_FAIL:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default requirementReducer;
