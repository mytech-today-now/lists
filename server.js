const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

let lists = {
  "Default List": [
    { text: "Sample Task 1", completed: false },
    { text: "Sample Task 2", completed: true }
  ]
};

// Endpoint to get all lists
app.get('/api/lists', (req, res) => {
  res.json(lists);
});

// Endpoint to add a new list
app.post('/api/lists', (req, res) => {
  const { listName } = req.body;
  const decodedListName = decodeURIComponent(listName);
  if (!lists[decodedListName]) {
    lists[decodedListName] = [];
    res.status(201).json({ message: 'List created successfully', list: lists[decodedListName] });
  } else {
    res.status(400).json({ message: 'List already exists', list: lists[decodedListName] });
  }
});

// Endpoint to add a new task to a list
app.post('/api/lists/:listName/tasks', (req, res) => {
  const decodedListName = decodeURIComponent(req.params.listName);
  const { task } = req.body;
  if (lists[decodedListName]) {
    lists[decodedListName].push({ text: task, completed: false });
    res.status(201).json({ message: 'Task added successfully', list: lists[decodedListName] });
  } else {
    res.status(404).json({ message: 'List not found' });
  }
});

// Endpoint to toggle task completion
app.put('/api/lists/:listName/tasks/:taskIndex', (req, res) => {
  const decodedListName = decodeURIComponent(req.params.listName);
  const { taskIndex } = req.params;
  if (lists[decodedListName] && lists[decodedListName][taskIndex]) {
    lists[decodedListName][taskIndex].completed = !lists[decodedListName][taskIndex].completed;
    res.status(200).json({ message: 'Task updated successfully', list: lists[decodedListName] });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// Endpoint to delete a task from a list
app.delete('/api/lists/:listName/tasks/:taskIndex', (req, res) => {
  const decodedListName = decodeURIComponent(req.params.listName);
  const { taskIndex } = req.params;
  if (lists[decodedListName] && lists[decodedListName][taskIndex]) {
    lists[decodedListName].splice(taskIndex, 1);
    res.status(200).json({ message: 'Task deleted successfully', list: lists[decodedListName] });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// Endpoint to remove a list using PUT
app.put('/api/lists/:listName/remove', (req, res) => {
  const decodedListName = decodeURIComponent(req.params.listName);
  if (lists[decodedListName]) {
    delete lists[decodedListName];
    res.status(200).json({ message: 'List removed successfully' });
  } else {
    res.status(404).json({ message: 'List not found' });
  }
});

// Handle root URL
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
