// routes/tasks.js
const express = require('express');
const router = express.Router();
const { addTask, getTasks, deleteTask } = require('../controllers/tasksController');
const verifyToken = require('../middleware/verifyToken');

// Add Task
router.post('/add', verifyToken, addTask);

// Get Tasks
router.get('/', verifyToken, getTasks);

// Delete Task
router.delete('/:id', verifyToken, deleteTask);

module.exports = router;
