require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Create Express app
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Test route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Import routes
const authRouter = require('./routes/authRoutes');
const projectRouter = require('./routes/projectRoutes');
const taskRouter = require('./routes/taskRoutes');

// Use routes
app.use('/api/auth', authRouter);
app.use('/api/projects', projectRouter);
app.use('/api/projects', taskRouter);

// Error handling middleware
const { errorHandler } = require('./middlewares/errorHandler');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`MongoDB URI: ${process.env.MONGO_URI}`);
});