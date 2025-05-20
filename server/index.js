import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import TodoModel from './models/Todo.js';
import dotenv from 'dotenv';

// Variable 
dotenv.config();
const HOSTNAME = process.env.HOSTNAME;
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;
const MONGO_CONNECTION_STRING = `${MONGO_URI}${DB_NAME}`;

// express 
const app = express();
app.use(cors());
app.use(express.json());

// Mongo DB connection
mongoose.connect(MONGO_CONNECTION_STRING);
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Check mongo db connection
mongoose.connection.once('open', () => {
  console.log(`Connected to DB: ${mongoose.connection.name}`);
});


// Routes
// Add Todo
app.post('/add', async (req, res) => {
  try {
    const task = req.body.task;
    const newTodo = await TodoModel.create({ task, done: false});
    const todos = await TodoModel.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Todo
app.get('/get', async (req, res) => {
  try {
    const todos = await TodoModel.find();
    console.log(todos)
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Todo
app.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await TodoModel.findById(id);
    todo.done = !todo.done;
    await todo.save();
    const todos = await TodoModel.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Todo
app.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await TodoModel.findByIdAndDelete(id);
    const todos = await TodoModel.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Start Server
app.listen(PORT, HOSTNAME, () => {
  console.log(`app is running at http://${HOSTNAME}:${PORT}`);
});
