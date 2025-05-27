import React from "react";

function Tasks({task,setTasks}) {
  const toggleComplete = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const removeTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };
  return (
    <li
      key={task.id}
      className="task"
    >
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
          aria-label={`Mark task "${task.text}" as completed`}
        />
        <span>{task.text}</span>
      </label>
      <div>
        <button            
          onClick={() => removeTask(task.id)}
          title="Remove task"
          aria-label={`Remove task "${task.text}"`}
        >
          ✖
        </button>
      </div>
    </li>
  );
}

export default Tasks;
