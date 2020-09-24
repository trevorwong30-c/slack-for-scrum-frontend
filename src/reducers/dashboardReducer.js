import { LOAD_DASHBOARD_DATA_SUCCESS } from "../actions/dashboardActions";

const dashboardReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_DASHBOARD_DATA_SUCCESS:
      console.log("state", state);
      return {
        ...state,
        data: action.data
      };
    // case 'TOGGLE_TODO':
    //   return state.map(todo =>
    //     (todo.id === action.id)
    //       ? {...todo, completed: !todo.completed}
    //       : todo
    //   )
    default:
      return state;
  }
};

export default dashboardReducer;
