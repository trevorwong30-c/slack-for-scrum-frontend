import {TaskStatus} from "../enums";

export interface Requirement {
  id: number;
  title: string;
  description: string;
  estimatedEffort: number;
  createdAt: Date;
  dueAt: Date;
}

export interface Task {
  id: number;
  reqId: number;
  title: string;
  description: string;
  estimatedHour: number;
  remainingHour: number;
  historicalSpent: any;
  status: TaskStatus;
  assigneeId: number;
  commentsHistory: Array<Comment>;
  createdAt: Date;
  endAt: Date;
}

export interface Comment {
  userId: number
  content: string
  createdAt: Date;
}

export interface User {
  id: number;
  username: string;
  role: number;
}

interface State {
  error: string;
}

export interface UserState extends State {
  userList: Array<User>;
  userMap: Record<number, User>; // A map to index the users by their ids
  searchResults: Array<User>;
  isSearching: boolean;
  isLoadingUserList: boolean;
}
