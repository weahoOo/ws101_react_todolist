import React, { useState, useEffect } from 'react';

function AddToDo({ addTodo, editIndex, todos }) {
  const [task, setTask] = useState('');
  const [category, setCategory] = useState('Personal');

  useEffect(() => {
    if (editIndex !== null) {
      setTask(todos[editIndex].text);
      setCategory(todos[editIndex].category);
    }
  }, [editIndex, todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTodo(task, category);
      setTask('');
      setCategory('Personal'); // Reset to default after adding
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task"
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Personal">Personal</option>
        <option value="Cat Life">Cat Life</option>
      </select>
      <button type="submit">{editIndex !== null ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
}

export default AddToDo;
