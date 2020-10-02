import { DeepPartial } from '@reduxjs/toolkit';
import createRequirementState from './redux/states/requirementState';
import createSprintState from './redux/states/sprintState';
import createTaskState from './redux/states/taskState';

const createRootState = () => {
  return {
    requirement: createRequirementState(),
    sprint: createSprintState(),
    task: createTaskState()
  };
};

export default createRootState;
