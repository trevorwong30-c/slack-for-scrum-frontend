import { combineReducers } from 'redux';

import requirementReducer from './redux/reducers/requirementReducer';
import sprintReducer from './redux/reducers/sprintReducer';
import taskReducer from './redux/reducers/taskReducer';
import userReducer from './redux/reducers/userReducer';
import getTaskWithReqIdReducer from './redux/reducers/getTaskWithReqId';

const rootReducer = combineReducers({
  sprint: sprintReducer,
  requirement: requirementReducer,
  task: taskReducer,
  user: userReducer,
  tasksWithReqId: getTaskWithReqIdReducer
});

export default rootReducer;
