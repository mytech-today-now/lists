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
        .then(data => {
          setLists(prevLists => ({ ...prevLists, [newListName]: [] }));
          setNewListName('');
          toast.success('List added successfully');
        })
        .catch(error => {
          console.error('Fetch error:', error);
          toast.error('Failed to add list');
        });
    }
  };

  const addTask = (listName, task) => {
    fetch(`http://localhost:3001/api/lists/${encodeURIComponent(listName)}/tasks`, {
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
      .then(data => {
        setLists(prevLists => ({ ...prevLists, [listName]: [...prevLists[listName], { text: task, completed: false }] }));
        toast.success('Task added successfully');
      })
      .catch(error => {
        console.error('Fetch error:', error);
        toast.error('Failed to add task');
      });
  };

  const toggleComplete = (listName, taskIndex) => {
    fetch(`http://localhost:3001/api/lists/${encodeURIComponent(listName)}/tasks/${taskIndex}`, {
      method: 'PUT',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setLists(prevLists => ({
          ...prevLists,
          [listName]: prevLists[listName].map((task, index) =>
            index === taskIndex ? { ...task, completed: !task.completed } : task
          ),
        }));
        toast.success('Task updated successfully');
      })
      .catch(error => {
        console.error('Fetch error:', error);
        toast.error('Failed to update task');
      });
  };

  const deleteTask = (listName, taskIndex) => {
    fetch(`http://localhost:3001/api/lists/${encodeURIComponent(listName)}/tasks/${taskIndex}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setLists(prevLists => ({
          ...prevLists,
          [listName]: prevLists[listName].filter((_, index) => index !== taskIndex),
        }));
        toast.success('Task deleted successfully');
      })
      .catch(error => {
        console.error('Fetch error:', error);
        toast.error('Failed to delete task');
      });
  };

  const deleteList = (listName) => {
    if (lists[listName]) {
      if (window.confirm(`Are you sure you want to delete the list "${listName}"?`)) {
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(() => {
            setLists(prevLists => {
              const newLists = { ...prevLists };
              delete newLists[listName];
              return newLists;
            });
            toast.success('List removed successfully');
          })
          .catch(error => {
            console.error('Fetch error:', error);
            toast.error('Failed to remove list');
          });
      }
    } else {
      toast.error('List does not exist');
    }
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
          <div key={listName} className="list">
            <h2>{listName}</h2>
            <button onClick={() => deleteList(listName)}>Delete List</button>
            <TodoList
              name={listName}
              tasks={lists[listName] || []} // Ensure tasks is an array
              addTask={addTask}
              toggleComplete={toggleComplete}
              deleteTask={deleteTask}
            />
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
