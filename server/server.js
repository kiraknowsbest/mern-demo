const express = require("express");
const cors = require("cors")
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
require("dotenv").config();

// MongoDB stuff.
const MONGODB_URL = "mongodb+srv://kiraknowsbest:T3chn1c4l1ty@kiraknowsbest0.bzuy2so.mongodb.net/?retryWrites=true&w=majority";
const db = mongoose.connect(MONGODB_URL);
// Schema for a Todo.
const todoSchema = new mongoose.Schema({
  created_at: {
    type: Date,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

// Model (collection) of the Todo types.
const Todo = mongoose.model('Todo', todoSchema);

const server = express();
server.use(cors());
const jsonParser = bodyParser.json()

const port = process.env.PORT || 5000;

// API to request all todos.
server.get('/api/todos', async (req, res) => {
  console.log('received request at /api/todos');
  const todos = await Todo.find().sort({ created_at: -1 });
  res.send(todos);
});

// API to create a todo.
server.post('/api/todos/create', jsonParser, (req, res) => {
  console.log('received request at /api/todos/create');
  console.log('todo label is: ', req.body.label);

  const todo = new Todo({
    created_at: new Date(),
    label: req.body.label,
  });
  todo
    .save()
    .then(
      () => {
        console.log('todo with label ' + req.body.label + ' created');
        res.send({ status: 'SUCCESS' });
      },
      (err) => {
        console.log(err);
        res.send({ status: 'ERROR' });
      },
    );
});

// API to delete a todo.
server.post('/api/todos/delete', jsonParser, async (req, res) => {
  console.log('received request at /api/todos/delete');
  console.log('todo _id is: ', req.body._id);

  const deleted = await Todo.deleteOne({ _id: req.body._id });
  console.log('deleted: ')
  console.log(deleted)
  if (deleted.deletedCount === 1) {
    console.log('todo with _id ' + req.body._id + ' deleted');
    res.send({ status: 'SUCCESS' });
  } else {
    console.log('I did not find that todo');
    res.send({ status: 'ERROR' });
  }
});

server.listen(port, function () {
  console.log('listening on port ' + port + '...');
});

module.exports = server;
