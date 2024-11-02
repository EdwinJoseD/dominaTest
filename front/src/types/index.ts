export interface Task {
  _id: string;
  title: string;
  userId?: string;
  description: string;
  completed?: boolean;
  createdAt: string;
}

export interface User {
  email: string;
  name: string;
}
