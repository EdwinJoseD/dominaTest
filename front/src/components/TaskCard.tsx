import { Check, Trash2, Edit } from 'lucide-react';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export function TaskCard({ task, onComplete, onDelete, onEdit }: TaskCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-3 transition-all hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            {task.title}
          </h3>
          <p className={`text-sm mt-1 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
            {task.description}
          </p>
          <span className="text-xs text-gray-400 mt-2 block">
            {new Date(task.createdAt).toLocaleDateString()}
          </span>
          <span className="text-xs text-gray-400 mt-3 block">
            {task.completed ? 'Completed' : 'Pending'}
          </span>
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => onComplete(task._id)}
            className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
          >
            <Check size={18} />
          </button>
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}