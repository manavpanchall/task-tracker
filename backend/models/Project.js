const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a project name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  tasks: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Task',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent user from having more than 4 projects
ProjectSchema.index({ user: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('Project', ProjectSchema);