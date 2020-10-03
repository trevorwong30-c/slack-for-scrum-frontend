import { combineReducers } from 'redux';

import requirementReducer from './redux/reducers/requirementReducer';
import sprintReducer from './redux/reducers/sprintReducer';
import taskReducer from './redux/reducers/taskReducer';
import userReducer from "./redux/reducers/userReducer";

const rootReducer = combineReducers({
  sprint: sprintReducer,
  requirement: requirementReducer,
  task: taskReducer,
  user: userReducer
});

export default rootReducer;
