import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './TodoList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [lists, setLists] = useState({});
  const [newListName, setNewListName] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/lists')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setLists(data))
      .catch(error => {
        console.error('Fetch error:', error);
        toast.error('Failed to fetch lists');
      });
  }, []);

  const addList = () => {
    if (newListName.trim() !== '') {
      fetch('http://localhost:3001/api/lists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ listName: newListName }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(() => {
          setLists(prevLists => ({ ...prevLists, [newListName]: [] }));
          setNewListName('');
        })
        .catch(error => {
          console.error('Fetch error:', error);
          toast.error('Failed to add list');
        });
    }
  };

  const addTask = (listName, task) => {
    fetch(`http://localhost:3001/api/lists/${listName}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        setLists(prevLists => ({
          ...prevLists,
          [listName]: [...prevLists[listName], { text: task, completed: false }],
        }));
      })
      .catch(error => {
        console.error('Fetch error:', error);
        toast.error('Failed to add task');
      });
  };

  const toggleComplete = (listName, taskIndex) => {
    fetch(`http://localhost:3001/api/lists/${listName}/tasks/${taskIndex}`, {
      method: 'PUT',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        setLists(prevLists => ({
          ...prevLists,
          [listName]: prevLists[listName].map((task, index) =>
            index === taskIndex ? { ...task, completed: !task.completed } : task
          ),
        }));
      })
      .catch(error => {
        console.error('Fetch error:', error);
        toast.error('Failed to toggle task completion');
      });
  };

  const deleteTask = (listName, taskIndex) => {
    fetch(`http://localhost:3001/api/lists/${listName}/tasks/${taskIndex}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        setLists(prevLists => ({
          ...prevLists,
          [listName]: prevLists[listName].filter((_, index) => index !== taskIndex),
        }));
      })
      .catch(error => {
        console.error('Fetch error:', error);
        toast.error('Failed to delete task');
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (newListName.trim() !== '') {
        addList();
      }
    }
  };

  return (
    <div className="App">
      <h1>To-Do Lists</h1>
      <input
        type="text"
        value={newListName}
        onChange={(e) => setNewListName(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Add a new list"
      />
      <button onClick={addList}>Add List</button>
      <div className="lists-container">
        {Object.keys(lists).map(listName => (
          <TodoList
            key={listName}
            name={listName}
            tasks={lists[listName]}
            addTask={addTask}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
          />
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
