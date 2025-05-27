import { useState, useEffect } from 'react';
import './App.css';
import Tasks from './components/Tasks';

export default function App() {
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState(() => {
    const saved_tasks = localStorage.getItem('todo_tasks');
    if(saved_tasks)
    {
      return JSON.parse(saved_tasks).map(task => ({ ...task, createdAt: new Date(task.createdAt) }));
    }
    return [];
  });
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('createdAsc');

  useEffect(() => {
    const tasksToSave = tasks.map(t => ({ ...t, createdAt: t.createdAt.toISOString() }));
    localStorage.setItem('todo_tasks', JSON.stringify(tasksToSave));
  }, [tasks]);

  const handleInputChange = (e) => setTaskInput(e.target.value);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskInput.trim()) {
      alert('Task cannot be empty!');
      return;
    }
    const newTask = {
      id: Date.now(),
      text: taskInput.trim(),
      completed: false,
      createdAt: new Date(),
    };
    setTasks(prev => [newTask, ...prev]);
    setTaskInput('');
  };
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const sortedTasks = filteredTasks.slice().sort((a, b) => {
    switch (sort) {
      case 'createdAsc': return a.createdAt - b.createdAt;
      case 'createdDesc': return b.createdAt - a.createdAt;
      case 'completed': return (a.completed === b.completed) ? 0 : a.completed ? 1 : -1;
      default: return 0;
    }
  });

  return (
    <div className='App'>
    <div className='wrapper'>
      <h1>To-Do List</h1>
      <form onSubmit={handleAddTask} noValidate>
        <input
          type="text"
          placeholder="Enter new task..."
          value={taskInput}
          onChange={handleInputChange}
          autoFocus
        />
        <button type="submit"  disabled={!taskInput.trim()}>
          Add
        </button>
      </form>

      <div className='dash'>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">All Tasks</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="createdAsc">Oldest First</option>
          <option value="createdDesc">Newest First</option>
          <option value="completed">Incomplete First</option>
        </select>
        <span>Tasks: {filteredTasks.length}</span>
      </div>

      <ul aria-live="polite">
        {sortedTasks.length === 0 ? (
          <li>No tasks to display.</li>
        ) : (
          sortedTasks.map(task => ( <Tasks key={task.id} setTasks={setTasks}  task={task}/>
          ))
        )}
      </ul>
    </div>
    </div>
  );
}
