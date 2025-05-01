const Project = require('../models/Project');

// @desc    Get all projects for a user
// @route   GET /api/projects
// @access  Private
const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ user: req.user.id }).populate('tasks');
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res, next) => {
  try {
    // Check if user already has 4 projects
    const projectCount = await Project.countDocuments({ user: req.user.id });
    if (projectCount >= 4) {
      return res.status(400).json({ message: 'Maximum of 4 projects allowed' });
    }

    const { name, description } = req.body;

    const project = new Project({
      name,
      description,
      user: req.user.id,
    });

    await project.save();

    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user owns the project
    if (project.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    project = await Project.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );

    res.json(project);
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user owns the project
    if (project.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await project.remove();

    res.json({ message: 'Project removed' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
};