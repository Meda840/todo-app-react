import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState(""); // State to hold the input value

  const [tasks, setTasks] = useState([]); // State to hold the list of tasks
  const [editingIndex, setEditingIndex] = useState(null); // State to hold the index of the task being edited
  const [editTaskValue, setEditTaskValue] = useState(""); // State to hold the edited task value

  // Function to update the input state
  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  // Function to handle task submission
  const handleSubmit = () => {
    if (task.trim()) {
      const updatedTasks = [...tasks, { text: task, completed: false }]; // Add the task to the task list
      setTasks(updatedTasks);
      setTask(""); // Clear the input field
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };
  // Delete a task from the list
  const handleDelete = (indexToDelete) => {
    const filteredTasks = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(filteredTasks);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  };

  const toggleComplete = (indexToToggle) => {
    const updatedTasks = tasks.map((item, index) =>
      index === indexToToggle ? { ...item, completed: !item.completed } : item
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditTaskValue(tasks[index].text); // Pre-fill input with existing task text
  };
  const handleSaveEdit = (index) => {
    const updatedTasks = tasks.map((item, i) =>
      i === index ? { ...item, text: editTaskValue } : item
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setEditingIndex(null); // Exit edit mode
  };
  const handleEditInputChange = (e) => {
    setEditTaskValue(e.target.value);
  };
  // Cancel editing
  const handleCancelEdit = () => {
    setEditingIndex(null); // Exit edit mode without saving
  };

  // Load tasks from local storage when the app starts
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks)); // Load saved tasks from local storage
    }
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="App">
      <header className="App-header">
        <h1>To-Do List</h1>
        <input
          type="text"
          placeholder="Add a new task"
          value={task}
          onChange={handleInputChange}
        />
        <button onClick={handleSubmit}>Add Task</button>
        <ul>
          {tasks.map((item, index) => (
            <li key={index}>
              {editingIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editTaskValue}
                    onChange={handleEditInputChange}
                  />
                  <button onClick={() => handleSaveEdit(index)}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  <span
                    onClick={() => toggleComplete(index)}
                    style={{
                      textDecoration: item.completed ? "line-through" : "none",
                    }}
                  >
                    {item.text}
                  </span>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
