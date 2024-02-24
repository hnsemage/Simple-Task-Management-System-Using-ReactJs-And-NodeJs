const express = require('express');
const router = express.Router();
const taskController = require('../controller/TaskController');

// Create a new task
router.post('/api/CreateTasks', taskController.createTask);

// Retrieve all tasks
router.get('/AllTasks', taskController.getAllTasks);

// Retrieve a task by ID
router.get('/TaskById/:taskId', taskController.getTaskById);

// Update a task by ID
router.put('/UpdateTask/:taskId', taskController.updateTask);

// Update only the task status of a task by ID
router.patch('/UpdateTaskStatus/:taskId/status', taskController.updateTaskStatus);

// Delete a task by ID
router.delete('/DeleteTask/:taskId', taskController.deleteTask);

module.exports = router; // Export the router object
