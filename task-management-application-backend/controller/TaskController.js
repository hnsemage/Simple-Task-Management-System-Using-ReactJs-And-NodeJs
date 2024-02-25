const Task = require('../model/Task'); //Task model class is imported

//Controller function to create a new task
exports.createTask = async (req, res) => {
  try {
    // Save the new task to the database
      const task = new Task(req.body);
      const savedTask = await task.save();
      res.status(201).json({ message: 'Task created successfully', task: savedTask });
  } catch (err) {
    // Handle any errors that occurs
      console.error('Task creation failed:', err); 
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

//Controller function to get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    // Retrieve all tasks from the database
      const tasks = await Task.find();
      res.status(200).json(tasks);
  } catch (err) {
    // Handle any errors that occurs
      console.error('Error retrieving tasks:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

//Controller function to get task by the the taskId
exports.getTaskById = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    // Find a task by its ID
      const task = await Task.findOne({ taskId: taskId });
      if (!task) {
          return res.status(404).json({ error: 'Task not found' });
      }
      res.status(200).json(task);
  } catch (err) {
    // Handle any errors that occurs
      console.error('Error retrieving task:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

//Controller function to update already created tasks and this function also has the option provided to update only the taskStatus
exports.updateTask = async (req, res) => {
    const taskId = req.params.taskId;
    const { taskStatus, ...updateData } = req.body;

    try {
        // Update task status if provided, otherwise update all task information
        let updatedTask;
        if (taskStatus) {
            // Update only the task status
            updatedTask = await Task.findOneAndUpdate({ taskId: parseInt(taskId) }, { taskStatus }, { new: true });
        } else {
            // Update all task information
            updatedTask = await Task.findOneAndUpdate({ taskId: parseInt(taskId) }, updateData, { new: true });
        }

        // Handle task not found
        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (err) {
        // Handle any errors that occurs
        console.error('Error updating task:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//Controller function to delete a task
exports.deleteTask = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    // Find and delete a task by its ID
      const deletedTask = await Task.findOneAndDelete({ taskId: taskId });
      if (!deletedTask) {
          return res.status(404).json({ error: 'Task not found' });
      }
      res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    // Handle any errors that occurs
      console.error('Error deleting task:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};
