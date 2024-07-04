import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchComponent from './components/SearchComponent'; // Import the SearchComponent

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
      .then(data => {
        console.log('Fetched data:', data); // Debugging log
        setLists(data)
      })
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
          toast.success('List added successfully');
        })
        .catch(error => {
          console.error('Fetch error:', error);
          toast.error('Failed to add list');
        });
    }
  };

  const addTask = (listName, task) => {
    const encodedListName = encodeURIComponent(listName);
    fetch(`http://localhost:3001/api/lists/${encodedListName}/tasks`, {
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
        setLists(prevLists => {
          const updatedTasks = [...(prevLists[listName] || []), { text: task, completed: false }];
          return { ...prevLists, [listName]: updatedTasks };
        });
        toast.success('Task added successfully');
      })
      .catch(error => {
        console.error('Fetch error:', error);
        toast.error('Failed to add task');
      });
  };

  const toggleComplete = (listName, taskIndex) => {
    const updatedTasks = lists[listName].map((task, index) => {
      if (index === taskIndex) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setLists(prevLists => ({ ...prevLists, [listName]: updatedTasks }));
  };

  const deleteTask = (listName, taskIndex) => {
    const updatedTasks = lists[listName].filter((_, index) => index !== taskIndex);
    setLists(prevLists => ({ ...prevLists, [listName]: updatedTasks }));
  };

  const deleteList = (listName) => {
    if (listName in lists) {
      if (window.confirm(`Are you sure you want to delete the list: ${listName}?`)) {
        const encodedListName = encodeURIComponent(listName);
        fetch(`http://localhost:3001/api/lists/${encodedListName}`, {
          method: 'DELETE',
        })
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

  return (
    <div className="App">
      <h1>To-Do Lists</h1>
      <input
        type="text"
        value={newListName}
        onChange={(e) => setNewListName(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && newListName.trim() !== '') {
            addList();
          }
        }}
        placeholder="Add a new list"
      />
      <button onClick={addList}>Add List</button>

      {/* Integrate SearchComponent */}
      <SearchComponent lists={Object.keys(lists).map(listName => ({
        title: listName,
        items: lists[listName]
      }))} />

      <div className="lists-container">
        {Object.keys(lists).map(listName => (
          <div key={listName} className="list">
            <h2>{listName}</h2>
            <button onClick={() => deleteList(listName)}>Delete List</button>
            <TodoList
              name={listName}
              tasks={Array.isArray(lists[listName]) ? lists[listName] : []} // Ensure tasks is an array
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
