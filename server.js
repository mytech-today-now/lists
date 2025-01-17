const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

let lists = {
  'today': [{ text: 'Task 1', completed: false }, { text: 'Task 2', completed: false }]
};

// Endpoint to get all lists
app.get('/api/lists', (req, res) => {
  res.json(lists);
});

// Endpoint to get a specific list and its tasks
app.get('/api/lists/:listName', (req, res) => {
  const { listName } = req.params;
  const decodedListName = decodeURIComponent(listName);
  console.log(`Decoded List Name: ${decodedListName}`);

  if (lists.hasOwnProperty(decodedListName)) {
    res.json(lists[decodedListName]);
  } else {
    res.status(404).json({ message: 'List not found' });
  }
});

// Endpoint to add a new list
app.post('/api/lists', (req, res) => {
  const { listName } = req.body;
  if (!lists[listName]) {
    lists[listName] = [];
    res.status(201).json({ message: 'List created successfully' });
  } else {
    res.status(400).json({ message: 'List already exists' });
  }
});

// Endpoint to add a new task to a list
app.post('/api/lists/:listName/tasks', (req, res) => {
  const { listName } = req.params;
  const { task } = req.body;
  const decodedListName = decodeURIComponent(listName);
  console.log(`Decoded List Name: ${decodedListName}`);
  
  if (lists[decodedListName]) {
    lists[decodedListName].push({ text: task, completed: false });
    res.status(201).json({ message: 'Task added successfully' });
  } else {
    res.status(404).json({ message: 'List not found' });
  }
});

// Endpoint to toggle task completion
app.put('/api/lists/:listName/tasks/:taskIndex', (req, res) => {
  const { listName, taskIndex } = req.params;
  const decodedListName = decodeURIComponent(listName);
  if (lists[decodedListName] && lists[decodedListName][taskIndex]) {
    lists[decodedListName][taskIndex].completed = !lists[decodedListName][taskIndex].completed;
    res.status(200).json({ message: 'Task updated successfully' });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// Endpoint to delete a task from a list
app.delete('/api/lists/:listName/tasks/:taskIndex', (req, res) => {
  const { listName, taskIndex } = req.params;
  const decodedListName = decodeURIComponent(listName);
  if (lists[decodedListName] && lists[decodedListName][taskIndex]) {
    lists[decodedListName].splice(taskIndex, 1);
    res.status(200).json({ message: 'Task deleted successfully' });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// Endpoint to delete a list
app.delete('/api/lists/:listName', (req, res) => {
  const { listName } = req.params;
  const decodedListName = decodeURIComponent(listName);
  if (lists.hasOwnProperty(decodedListName)) {
    delete lists[decodedListName];
    res.status(200).json({ message: 'List deleted successfully' });
  } else {
    res.status(404).json({ message: 'List not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
