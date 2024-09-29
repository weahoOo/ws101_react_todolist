import React, { useState } from 'react';
import './App.css';
import AddToDo from './components/AddToDo';

function App() {
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const emoticons = {
    catnap: "😸",
    play: "🐾",
    "eat fish": "🐟",
    "chase mice": "🐭",
    relax: "🐱",
    purr: "😽",
    sleep: "😴",
    "jump around": "🐾",
    "play with yarn": "🧶",
    "stare outside": "👀",
    stretch: "😻",
    "napping": "😴🐱", 
    "chasing mice": "🐁🐱",
    "eating": "🍽️🐱",
    "scratching post": "🪵🐱",
    "bird watching": "🐦🐱",
    "playing with toys": "🧶🐱",
    "using litter box": "🚽🐱",
    "drinking water": "💧🐱",
    "purring": "💤🐱",
    "climbing": "🧗‍♂️🐱",
    "hunting bugs": "🦟🐱", 
    // Human's tasks to take care of a cat
    "feeding cat": "🍲🐱",
    "cleaning litter": "🧽🚽🐱",
    "giving medicine": "💊🐱",
    "brushing cat": "🧴🐱",
    "taking to vet": "🐾🚑",
    "playing with cat": "🧶👨‍👩‍👧‍👦🐱",
    "buying cat food": "🛒🍲🐱",
    "training cat": "📚🐱",
    "petting cat": "🤲🐱",
    "cleaning cat area": "🧼🧹🐱",
    "providing fresh water": "💧🐱"
  };

  function getEmoticon(task) {
    const taskLower = task.toLowerCase();
    for (let keyword in emoticons) {
      if (taskLower.includes(keyword)) {
        return emoticons[keyword];
      }
    }
    return "🐾"; // Default paw icon if no match
  }

  const addTodo = (task, category) => {
    const assignedEmoticon = getEmoticon(task);

    if (editIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = { ...updatedTodos[editIndex], text: task, category, emoticon: assignedEmoticon };
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      setTodos([...todos, { text: task, completed: false, category, emoticon: assignedEmoticon }]);
    }
  };

  const toggleComplete = (index) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, i) => {
        if (i === index) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const removeTodo = (index) => {
    setTodos((prevTodos) => {
      const newTodos = [...prevTodos];
      newTodos.splice(index, 1);
      return newTodos;
    });
  };

  const editTodo = (index) => {
    setEditIndex(index);
  };

  const renderTasksByCategory = (category) => {
    return todos
      .filter(todo => todo.category === category)
      .map((todo, index) => (
        <div key={index} className="todo-item">
          <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
            {todo.emoticon} {todo.text}
          </span>
          <div className="button-container">
            <button onClick={() => toggleComplete(index)} className="complete-btn">
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => editTodo(index)} className="edit-btn">Edit</button>
            <button onClick={() => removeTodo(index)} className="remove-btn">Remove</button>
          </div>
        </div>
      ));
  };

  return (
    <div className="app-container">
      <h1>🐱 Cat ToDo List 🐾</h1>
      <AddToDo addTodo={addTodo} editIndex={editIndex} todos={todos} />

      <div className="task-group">
        <h2>Personal Tasks</h2>
        {renderTasksByCategory("Personal")}
      </div>

      <div className="task-group">
        <h2>Cat Life Tasks</h2>
        {renderTasksByCategory("Cat Life")}
      </div>
    </div>
  );
}

export default App;
