import {combineReducers} from "redux";

import requirementReducer from "./requirement/reducer";
import sprintReducer from "./sprint/reducer";
import taskReducer from "./task/reducer";

const rootReducer = combineReducers({
  sprint: sprintReducer,
  requirement: requirementReducer,
  task: taskReducer
});

export default rootReducer;
