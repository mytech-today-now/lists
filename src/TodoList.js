import React, { useState } from 'react';

function TodoList({ name, tasks = [], addTask, toggleComplete, deleteTask }) {
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      addTask(name, newTask);
      setNewTask('');
    }
  };

  return (
    <div>
      <h3>{name}</h3>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.text}</span>
            <a href="#" onClick={() => toggleComplete(name, index)}>Complete</a>
            <a href="#" onClick={() => deleteTask(name, index)}>Delete</a>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={handleAddTask} style={{ backgroundColor: '#93E9BE', color: '#fff' }}>Add Task</button>
    </div>
  );
}

export default TodoList;
