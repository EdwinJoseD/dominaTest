import React, { useState, useEffect } from 'react';
import { Plus, LogOut } from 'lucide-react';
import { TaskCard } from '../components/TaskCard';
import { Task } from '../types';
import { useNavigate } from 'react-router-dom';
import { tasksApi } from '../service/api';

export function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const { data } = await tasksApi.getTasks();
      setTasks(data);
    } catch (err) {
        console.log(err);
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentTask) {
        const {data} = await tasksApi.updateTask(currentTask._id, {
          title,
          description,
        });
        if (data) loadTasks();
          
        
      } else {
         await tasksApi.createTask({
          title,
          description,
        });
        loadTasks();
      }
      setShowModal(false);
      setTitle('');
      setDescription('');
      setCurrentTask(null);
    } catch (err) {
        console.log(err);
      setError('Failed to save task');
    }
  };

  const handleEdit = (task: Task) => {
    setCurrentTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await tasksApi.deleteTask(id);
      loadTasks();
    } catch (err) {
        console.log(err);
      setError('Failed to delete task');
    }
  };

  const handleComplete = async (id: string) => {
    try {
      const task = tasks.find(t => t._id === id);
      if (!task) return;
      
       await tasksApi.updateTask(id, {
        title: task.title,
        description: task.description,
        completed: !task.completed,
      });
      
      loadTasks();
    } catch (err) {
        console.log(err);
      setError('Failed to update task');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              Add Task
            </button>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-600">No tasks yet</h3>
            <p className="text-gray-500 mt-2">Create your first task to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map(task => (
              <TaskCard
                key={task._id}
                task={task}
                onComplete={handleComplete}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-4">
              {currentTask ? 'Edit Task' : 'New Task'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={3}
                  required
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setCurrentTask(null);
                    setTitle('');
                    setDescription('');
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {currentTask ? 'Save Changes' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}