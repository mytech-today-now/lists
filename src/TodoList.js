import React, { useState } from 'react';
import { toast } from 'react-toastify';

function TodoList({ name, tasks, addTask, toggleComplete, deleteTask }) {
  const [newTaskName, setNewTaskName] = useState('');

  const handleAddTask = () => {
    if (newTaskName.trim() !== '') {
      addTask(name, newTaskName);
      setNewTaskName('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (newTaskName.trim() !== '') {
        handleAddTask();
      } else {
        toast.warn('Please enter a task to add.');
      }
    }
  };

  return (
    <div className="TodoList">
      <h2>{name}</h2>
      <input
        type="text"
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Add a new task"
      />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            {task.text}
            <a href="#!" onClick={() => toggleComplete(name, index)} style={{ marginLeft: '10px' }}>
              {task.completed ? 'Undo' : 'Complete'}
            </a>
            <a href="#!" onClick={() => deleteTask(name, index)} style={{ marginLeft: '10px' }}>
              Delete
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
