import {LOAD_REQUIREMENT_LIST_SUCCESS} from "./actions/loadRequirementList";

const requirementReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_REQUIREMENT_LIST_SUCCESS:
      return {
        ...state,
        list: action.list
      };
    default:
      return state;
  }
}

export default requirementReducer;