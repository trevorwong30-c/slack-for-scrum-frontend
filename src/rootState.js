import createRequirementState from "./requirement/state";
import createSprintState from "./sprint/state";
import createTaskState from "./task/state";

const createRootState = () => {
  return {
    requirement: createRequirementState(),
    sprint: createSprintState(),
    task: createTaskState()
  };
};

export default createRootState;