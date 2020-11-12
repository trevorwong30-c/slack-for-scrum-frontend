import { Task, TaskState } from "interfaces";
import { LOAD_ALL_TASKS_SUCCESS } from "redux/actions/loadAllTasks";
import createTaskState from "redux/states/taskState";

const taskReducer = (state:TaskState | any = createTaskState(), action: any): TaskState => {
  switch (action.type) {
    case 'POST_COMMENT_SUCCESS':
      return { ...state, tasks: action.tasks };
    case LOAD_ALL_TASKS_SUCCESS:
      console.log(`action.tasks`, action.tasks);
      return {
        ...state,
        taskList: action.tasks,
        taskMap: mapTasksById(action.tasks)
      };
    default:
      return state;
  }
};

const mapTasksById = (taskList: Array<Task>) => {
  if (!taskList) {
    return {};
  }

  let taskMap: Record<number, Task> = {};

  for(let task of taskList) {
    if (task.id) {
      taskMap[task.id] = task;
    }
  }

  return taskMap;

}

export default taskReducer;
