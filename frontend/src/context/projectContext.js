import { createContext, useContext, useState } from 'react';
import {
  getProjects,
  createProject as createProjectApi,
  updateProject as updateProjectApi,
  deleteProject as deleteProjectApi,
  getProjectTasks,
  createTask as createTaskApi,
  updateTask as updateTaskApi,
  deleteTask as deleteTaskApi,
} from '../services/projectService';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await getProjects();
      setProjects(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectTasks = async (projectId) => {
    setLoading(true);
    try {
      const data = await getProjectTasks(projectId);
      setCurrentProject(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (projectData) => {
    try {
      const newProject = await createProjectApi(projectData);
      setProjects([...projects, newProject]);
      return newProject;
    } catch (err) {
      throw err;
    }
  };

  const updateProject = async (projectId, projectData) => {
    try {
      const updatedProject = await updateProjectApi(projectId, projectData);
      setProjects(
        projects.map((project) =>
          project._id === projectId ? updatedProject : project
        )
      );
      return updatedProject;
    } catch (err) {
      throw err;
    }
  };

  const deleteProject = async (projectId) => {
    try {
      await deleteProjectApi(projectId);
      setProjects(projects.filter((project) => project._id !== projectId));
    } catch (err) {
      throw err;
    }
  };

  const createTask = async (projectId, taskData) => {
    try {
      const newTask = await createTaskApi(projectId, taskData);
      setCurrentProject({
        ...currentProject,
        tasks: [...currentProject.tasks, newTask],
      });
      return newTask;
    } catch (err) {
      throw err;
    }
  };

  const updateTask = async (projectId, taskId, taskData) => {
    try {
      const updatedTask = await updateTaskApi(projectId, taskId, taskData);
      setCurrentProject({
        ...currentProject,
        tasks: currentProject.tasks.map((task) =>
          task._id === taskId ? updatedTask : task
        ),
      });
      return updatedTask;
    } catch (err) {
      throw err;
    }
  };

  const deleteTask = async (projectId, taskId) => {
    try {
      await deleteTaskApi(projectId, taskId);
      setCurrentProject({
        ...currentProject,
        tasks: currentProject.tasks.filter((task) => task._id !== taskId),
      });
    } catch (err) {
      throw err;
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        currentProject,
        loading,
        error,
        fetchProjects,
        fetchProjectTasks,
        createProject,
        updateProject,
        deleteProject,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);