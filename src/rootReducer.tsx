import { combineReducers } from 'redux';

import requirementReducer from './redux/reducers/requirementReducer';
import sprintReducer from './redux/reducers/sprintReducer';
import taskReducer from './redux/reducers/taskReducer';
import userReducer from './redux/reducers/userReducer';
import getTaskWithReqIdReducer from './redux/reducers/getTaskWithReqId';
import createNewTaskReducer from './redux/reducers/createNewTaskReducer';
import getAllSprintsReducer from './redux/reducers/getAllSprintsReducer';
import updateSelectedSprintReducer from './redux/reducers/updateSelectedSprintReducer';
import getTasksWithSprintIdReducer from './redux/reducers/getTasksWithSprintIdReducer';
import addTaskIdToSprintReducer from './redux/reducers/addTaskIdToSprintReducer';

const rootReducer = combineReducers({
  sprint: sprintReducer,
  requirement: requirementReducer,
  task: taskReducer,
  user: userReducer,
  tasksWithReqId: getTaskWithReqIdReducer,
  createNewTask: createNewTaskReducer,
  getAllSprints: getAllSprintsReducer,
  updateSelectedSprint: updateSelectedSprintReducer,
  getTasksWithSprintId: getTasksWithSprintIdReducer,
  addTaskIdToSprint: addTaskIdToSprintReducer
});

export default rootReducer;
