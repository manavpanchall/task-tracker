const express = require('express');
const router = express.Router({ mergeParams: true });
const { 
  getTasks, 
  createTask, 
  updateTask, 
  deleteTask 
} = require('../controllers/taskController');
const { protect } = require('../middlewares/auth');

router.route('/')
  .get(protect, getTasks)
  .post(protect, createTask);

router.route('/:taskId')
  .put(protect, updateTask)
  .delete(protect, deleteTask);

module.exports = router;