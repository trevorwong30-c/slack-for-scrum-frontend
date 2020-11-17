import { UPDATE_SELECTED_SPRINT } from '../actions/updateSelectedSprintAction';

const initialState = {
  selectedSprintId: 1
};

const updateSelectedSprintReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_SELECTED_SPRINT: {
      return { ...state, selectedSprintId: action.sprintId };
    }
    default: {
      return { ...state };
    }
  }
};

export default updateSelectedSprintReducer;
