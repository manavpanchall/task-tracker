const Task = require('../models/Task');
const Project = require('../models/Project');

// @desc    Get all tasks for a project
// @route   GET /api/projects/:projectId/tasks
// @access  Private
const getTasks = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
      user: req.user.id,
    }).populate('tasks');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (err) {
    next(err);
  }
};

// @desc    Create a new task
// @route   POST /api/projects/:projectId/tasks
// @access  Private
const createTask = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
      user: req.user.id,
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const { title, description, status } = req.body;

    const task = new Task({
      title,
      description,
      status,
      project: project._id,
      completedAt: status === 'Completed' ? new Date() : null,
    });

    await task.save();

    // Add task to project
    project.tasks.push(task._id);
    await project.save();

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

// @desc    Update a task
// @route   PUT /api/projects/:projectId/tasks/:taskId
// @access  Private
const updateTask = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
      user: req.user.id,
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const { title, description, status } = req.body;

    let task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if task belongs to project
    if (task.project.toString() !== req.params.projectId) {
      return res.status(400).json({ message: 'Task does not belong to project' });
    }

    // Update completedAt if status changed to Completed
    const completedAt =
      status === 'Completed' && task.status !== 'Completed'
        ? new Date()
        : task.completedAt;

    task = await Task.findByIdAndUpdate(
      req.params.taskId,
      { title, description, status, completedAt },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a task
// @route   DELETE /api/projects/:projectId/tasks/:taskId
// @access  Private
const deleteTask = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
      user: req.user.id,
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if task belongs to project
    if (task.project.toString() !== req.params.projectId) {
      return res.status(400).json({ message: 'Task does not belong to project' });
    }

    await task.remove();

    // Remove task from project
    project.tasks = project.tasks.filter(
      (taskId) => taskId.toString() !== req.params.taskId
    );
    await project.save();

    res.json({ message: 'Task removed' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};