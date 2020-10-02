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
  status: number;
  assigneeId: number;
  commentsHistory: any;
  createdAt: Date;
  endAt: Date;
}

export interface User {
  id: number;
  username: string;
  role: number;
}
