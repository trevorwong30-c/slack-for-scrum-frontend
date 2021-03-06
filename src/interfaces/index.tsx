import { TaskStatus } from '../enums';

export interface Requirement {
  id: number;
  title: string;
  description: string;
  estimatedEffort: number;
  createdAt: string;
  dueAt: string;
}

export interface Task {
  id?: number;
  reqId?: number;
  title?: string;
  description?: string;
  estimatedHour?: number;
  remainingHour?: number;
  historicalSpent?: any;
  status?: TaskStatus;
  assigneeId?: number;
  commentsHistory?: Array<Comment>;
  createdAt?: Date;
  endAt?: Date;
  sprintId?: number;
  lastUpdateAt?: Date;
}

export interface Sprint {
  id?: number;
  estimatedHour?: number;
  createdAt?: string;
  endAt?: string;
  lastUpdateAt?: string;
}

export interface Comment {
  userId: number;
  content: string;
  createdAt: Date;
}

export interface User {
  id: number;
  username: string;
  role: number;
  isProjectUser: boolean;
}

interface State {
  error: string;
}

export interface RootState {
  requirement: any;
  sprint: any;
  task: TaskState;
  user: UserState;
}

export interface UserState extends State {
  userList: Array<User>;
  userMap: Record<number, User>; // A map to index the users by their ids
  searchResults: Array<User>;
  isSearching: boolean;
  isLoadingUserList: boolean;
  confirmUserTimestamp: number;
}

export interface TaskState extends State {
  taskList: Array<Task>;
  taskMap: Record<number, Task>; // A map to index the users by their ids
  isLoadingTaskList: boolean;
}
