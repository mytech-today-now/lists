import React from 'react';

function TodoList({ name, tasks, addTask, toggleComplete, deleteTask }) {
  const [newTask, setNewTask] = React.useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && newTask.trim() !== '') {
      addTask(name, newTask);
      setNewTask('');
    }
  };

  return (
    <div className="todo-list">
      <h3>{name}</h3>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Add a new task"
      />
      <ul>
        {tasks.map((task, index) => (
          // Ensure the task is a valid object with text and completed properties
          typeof task === 'object' && task !== null && 'text' in task && 'completed' in task ? (
            <li key={index} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <span className="task-text">{task.text}</span>
              <div className="task-actions">
                <a href="#" onClick={() => toggleComplete(name, index)}>
                  {task.completed ? 'Undo' : 'Complete'}
                </a>
                <a href="#" onClick={() => deleteTask(name, index)}>Delete</a>
              </div>
            </li>
          ) : (
            <li key={index} className="task-item invalid-task">
              Invalid Task
            </li>
          )
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
