import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getProjects = async () => {
  const response = await axios.get(`${API_URL}/projects`);
  return response.data;
};

const createProject = async (projectData) => {
  const response = await axios.post(`${API_URL}/projects`, projectData);
  return response.data;
};

const updateProject = async (projectId, projectData) => {
  const response = await axios.put(`${API_URL}/projects/${projectId}`, projectData);
  return response.data;
};

const deleteProject = async (projectId) => {
  const response = await axios.delete(`${API_URL}/projects/${projectId}`);
  return response.data;
};

const getProjectTasks = async (projectId) => {
  const response = await axios.get(`${API_URL}/projects/${projectId}/tasks`);
  return response.data;
};

const createTask = async (projectId, taskData) => {
  const response = await axios.post(`${API_URL}/projects/${projectId}/tasks`, taskData);
  return response.data;
};

const updateTask = async (projectId, taskId, taskData) => {
  const response = await axios.put(
    `${API_URL}/projects/${projectId}/tasks/${taskId}`,
    taskData
  );
  return response.data;
};

const deleteTask = async (projectId, taskId) => {
  const response = await axios.delete(
    `${API_URL}/projects/${projectId}/tasks/${taskId}`
  );
  return response.data;
};

export {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getProjectTasks,
  createTask,
  updateTask,
  deleteTask,
};