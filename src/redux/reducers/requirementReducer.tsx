import {
  LOAD_REQUIREMENT_LIST_SUCCESS,
  LOAD_REQUIREMENT_LIST_FAIL,
  RequirementAction
} from '../actions/loadRequirementList';

const initialState = {
  requirements: [],
  error: ''
};

const requirementReducer = (
  state = initialState,
  action: RequirementAction
) => {
  switch (action.type) {
    case LOAD_REQUIREMENT_LIST_SUCCESS:
      return {
        ...state,
        requirements: action.requirements
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
