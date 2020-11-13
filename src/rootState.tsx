import { RootState } from 'interfaces';
import createRequirementState from './redux/states/requirementState';
import createSprintState from './redux/states/sprintState';
import createTaskState from './redux/states/taskState';
import createUserState from "./redux/states/userState";

const createRootState = (): RootState => {
  return {
    requirement: createRequirementState(),
    sprint: createSprintState(),
    task: createTaskState(),
    user: createUserState()
  };
};

export default createRootState;
