import { combineReducers } from 'redux';

import requirementReducer from './redux/reducers/requirementReducer';
import sprintReducer from './redux/reducers/sprintReducer';
import taskReducer from './redux/reducers/taskReducer';

const rootReducer = combineReducers({
  sprint: sprintReducer,
  requirement: requirementReducer,
  task: taskReducer
});

export default rootReducer;
