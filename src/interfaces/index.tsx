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
  historicalSpent?: any; //TODO need HistoricalSpent interface
  status?: number;
  assigneeId?: number;
  commentsHistory?: any; //TODO need CommentsHistory interface
  createdAt?: Date;
  endAt?: Date;
}

export interface User {
  id: number;
  username: string;
  role: number;
}
