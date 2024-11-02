import { model, Schema } from 'mongoose';
import { Task } from './task.type';

const taskSchema = new Schema<Task>(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const taskModel = model('Task', taskSchema);
taskModel.syncIndexes();

export const TaskModel = taskModel;
