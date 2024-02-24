const Task = require('../model/Task');

exports.createTask = async (req, res) => {
  try {
      const task = new Task(req.body);
      const savedTask = await task.save();
      res.status(201).json({ message: 'Task created successfully', task: savedTask });
  } catch (err) {
      console.error('Task creation failed:', err); 
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
      const tasks = await Task.find();
      res.status(200).json(tasks);
  } catch (err) {
      console.error('Error retrieving tasks:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getTaskById = async (req, res) => {
  const taskId = req.params.taskId;
  try {
      const task = await Task.findOne({ taskId: taskId });
      if (!task) {
          return res.status(404).json({ error: 'Task not found' });
      }
      res.status(200).json(task);
  } catch (err) {
      console.error('Error retrieving task:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.updateTask = async (req, res) => {
  const taskId = req.params.taskId;
  try {
      const updatedTask = await Task.findOneAndUpdate({ taskId: taskId }, req.body, { new: true });
      if (!updatedTask) {
          return res.status(404).json({ error: 'Task not found' });
      }
      res.status(200).json(updatedTask);
  } catch (err) {
      console.error('Error updating task:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.updateTaskStatus = async (req, res) => {
  const taskId = req.params.taskId;
  const { taskStatus } = req.body;
  try {
      const updatedTask = await Task.findOneAndUpdate({ taskId: taskId }, { taskStatus: taskStatus }, { new: true });
      if (!updatedTask) {
          return res.status(404).json({ error: 'Task not found' });
      }
      res.status(200).json(updatedTask);
  } catch (err) {
      console.error('Error updating task status:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.deleteTask = async (req, res) => {
  const taskId = req.params.taskId;
  try {
      const deletedTask = await Task.findOneAndDelete({ taskId: taskId });
      if (!deletedTask) {
          return res.status(404).json({ error: 'Task not found' });
      }
      res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
      console.error('Error deleting task:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};
