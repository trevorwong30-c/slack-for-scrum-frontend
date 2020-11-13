import { TaskState } from "interfaces";

const createTaskState = (): TaskState => {
  return {
    taskList: [],
    taskMap: {},
    isLoadingTaskList: false,
    error: ""
  };
};

export default createTaskState;
