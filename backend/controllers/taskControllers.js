// controllers/tasksController.js

const db = require('../db'); // Import the database connection

// Add Task Controller
exports.addTask = (req, res) => {
  const { title, description } = req.body; // Destructure title and description from the request body
  const user_id = req.user.id; // Get the user ID from the authenticated user

  // Check if title is provided
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  // Insert the new task into the database
  db.query('INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)', [user_id, title, description], (err, result) => {
    if (err) throw err; // Handle any errors
    res.status(201).json({ message: 'Task added successfully' }); // Respond with success message
  });
};

// Get Tasks Controller
exports.getTasks = (req, res) => {
  const user_id = req.user.id; // Get the user ID from the authenticated user

  // Query the tasks associated with the user
  db.query('SELECT * FROM tasks WHERE user_id = ?', [user_id], (err, results) => {
    if (err) throw err; // Handle any errors
    res.json(results); // Respond with the list of tasks for the user
  });
};

// Delete Task Controller
exports.deleteTask = (req, res) => {
  const user_id = req.user.id; // Get the user ID from the authenticated user
  const { id } = req.params; // Get the task ID from the request parameters

  // Delete the task from the database if it belongs to the authenticated user
  db.query('DELETE FROM tasks WHERE id = ? AND user_id = ?', [id, user_id], (err, result) => {
    if (err) throw err; // Handle any errors
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found or not authorized' }); // If no task is deleted, send 404 error
    }
    res.json({ message: 'Task deleted successfully' }); // Respond with success message
  });
};
