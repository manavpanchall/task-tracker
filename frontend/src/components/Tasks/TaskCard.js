import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useProject } from '../../context/projectContext';
import { toast } from 'react-toastify';

const TaskCard = ({ task, projectId }) => {
  const { deleteTask } = useProject();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(projectId, task._id);
        toast.success('Task deleted successfully!');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to delete task');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Not Started':
        return 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      case 'In Progress':
        return 'bg-blue-200 text-blue-800 dark:bg-blue-700 dark:text-blue-200';
      case 'Completed':
        return 'bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-200';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition dark:border-gray-700 dark:bg-gray-800">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <div className="flex space-x-2">
          <Link
            to={`/projects/${projectId}/tasks/${task._id}/edit`}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <FiEdit size={18} />
          </Link>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-3">{task.description}</p>
      <div className="flex justify-between items-center">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}
        >
          {task.status}
        </span>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {task.completedAt
            ? `Completed on ${new Date(task.completedAt).toLocaleDateString()}`
            : `Created on ${new Date(task.createdAt).toLocaleDateString()}`}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;