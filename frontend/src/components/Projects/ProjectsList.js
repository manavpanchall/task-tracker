import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { useProject } from '../../context/projectContext';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';
import { toast } from 'react-toastify';

const ProjectsList = () => {
  const { user } = useAuth();
  const { projects, loading, error, fetchProjects, createProject } = useProject();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user, fetchProjects]);

  const handleCreateProject = async (projectData) => {
    try {
      await createProject(projectData);
      setShowForm(false);
      toast.success('Project created successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create project');
    }
  };

  if (loading) return <div className="text-center py-8">Loading projects...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Projects</h1>
        {projects.length < 4 && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Create Project
          </button>
        )}
      </div>

      {projects.length === 4 && (
        <div className="mb-4 p-4 bg-yellow-100 text-yellow-800 rounded-md">
          You've reached the maximum limit of 4 projects.
        </div>
      )}

      {showForm && (
        <ProjectForm
          onSubmit={handleCreateProject}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>

      {projects.length === 0 && !showForm && (
        <div className="text-center py-8">
          <p className="mb-4">You don't have any projects yet.</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Create Your First Project
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectsList;