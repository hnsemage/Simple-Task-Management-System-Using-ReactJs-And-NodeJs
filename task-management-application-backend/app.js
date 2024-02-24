const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/TaskRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use('/api', taskRoutes); // Mounting the task routes

mongoose.connect('mongodb://localhost:27017/TaskManager', {
   useNewUrlParser: true,
   useUnifiedTopology: true
}).then(() => {
   console.log('Connected to MongoDB');
   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('Error connecting to MongoDB:', err));
