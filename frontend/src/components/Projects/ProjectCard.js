import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useProject } from '../../context/projectContext';
import { toast } from 'react-toastify';

const ProjectCard = ({ project }) => {
  const { deleteProject } = useProject();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(project._id);
        toast.success('Project deleted successfully!');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to delete project');
      }
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition dark:border-gray-700 dark:bg-gray-800">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-semibold">{project.name}</h3>
        <div className="flex space-x-2">
          <Link
            to={`/projects/${project._id}/edit`}
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
      <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Tasks: {project.tasksCount || 0}
        </span>
        <Link
          to={`/projects/${project._id}/tasks`}
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          View Tasks
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;