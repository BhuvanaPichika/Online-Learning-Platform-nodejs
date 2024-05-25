

const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/users', require('./routes/users'));
app.use('/courses', require('./routes/courses'));
app.use('/lessons', require('./routes/lessons'));
app.use('/enrollments', require('./routes/enrollments'));

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.get('/',(req,res)=>res.json('Welcome To Online-Learning Platform...'))
