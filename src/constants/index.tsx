export const USER_ROLE = {
  PM: 0,
  BA: 1,
  Dev: 2
};

export const TASK_STATUS = {
  TO_DO: 0,
  IN_PROGRESS: 1,
  DONE: 2
};

export const API_END_POINTS = {
  GET_ALL_REQUIREMENTS: '/api/requirements/',
  GET_ALL_TASKS: '/api/tasks/',
  GET_ALL_SPRINTS: '/api/sprints/',
  GET_ALL_USERS: '/api/users/',
  GET_TASKS_WITH_REQ_ID: '/api/tasks/requirement/:requirementId',
  GET_TASKS_WITH_SPRINT_ID: '/api/tasks/sprint/:sprintId',
  POST_NEW_TASKS: '/api/tasks',
  POST_NEW_SPRINT: '/api/sprints',
  PUT_TASK: '/api/tasks/:taskId',
  PUT_USER: '/api/users/:userId',
  PUT_SPRINT: '/api/sprints/:sprintId',
  DELETE_TASK: '/api/tasks/:deleteTaskId'
};
