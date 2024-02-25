const express = require('express'); // Import Express.js framework
const cors = require('cors'); // Import the cors middleware
const mongoose = require('mongoose'); // Import Mongoose for MongoDB interactions
const bodyParser = require('body-parser'); // Import body-parser middleware for parsing request bodies
const taskRoutes = require('./routes/TaskRoutes'); // Import the task routes


// Create an Express application
const app = express();

// Define the port for the server
const PORT = process.env.PORT || 8080;

// Enable CORS for all routes
app.use(cors());

// Parse incoming request bodies in JSON format
app.use(bodyParser.json());

// Use the task routes for requests starting with '/api'
app.use('/api', taskRoutes);

// Connect to MongoDB and start the server
mongoose.connect('mongodb://localhost:27017/TaskManager', {
   useNewUrlParser: true,
   useUnifiedTopology: true
}).then(() => {
   console.log('Connected to MongoDB');
   // Start the server
   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('Error connecting to MongoDB:', err));
