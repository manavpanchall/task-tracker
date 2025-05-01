import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProject } from '../../context/projectContext';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import { toast } from 'react-toastify';

const TasksList = () => {
  const { projectId } = useParams();
  const { currentProject, loading, error, fetchProjectTasks, createTask } = useProject();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (projectId) {
      fetchProjectTasks(projectId);
    }
  }, [projectId, fetchProjectTasks]);

  const handleCreateTask = async (taskData) => {
    try {
      await createTask(projectId, taskData);
      setShowForm(false);
      toast.success('Task created successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create task');
    }
  };

  if (loading) return <div className="text-center py-8">Loading tasks...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{currentProject?.name}</h1>
          <p className="text-gray-600 dark:text-gray-300">{currentProject?.description}</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Create Task
        </button>
      </div>

      {showForm && (
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="space-y-4">
        {currentProject?.tasks?.length > 0 ? (
          currentProject.tasks.map((task) => (
            <TaskCard key={task._id} task={task} projectId={projectId} />
          ))
        ) : (
          <div className="text-center py-8">
            <p>No tasks found for this project.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksList;