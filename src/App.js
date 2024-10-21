import React, { useState, useEffect } from "react";
import "./App.css";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

function App() {
  const [tasks, setTasks] = useState([]); // State to hold the list of tasks
  // Load tasks from local storage when the app starts
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks)); // Load saved tasks from local storage
      } catch (e) {
        console.log(e);
      }
    }
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Add a new task
  const addTask = (task) => {
    const updatedTasks = [...tasks, { text: task, completed: false }]; // Create the updated task array
    setTasks(updatedTasks); // Update the state with the new array
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Store the updated array in localStorage
  };

  // Delete a task from the list
  const handleDelete = (indexToDelete) => {
    const filteredTasks = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(filteredTasks);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  };

  // Toggle completion status
  const toggleComplete = (indexToToggle) => {
    const updatedTasks = tasks.map((item, index) =>
      index === indexToToggle ? { ...item, completed: !item.completed } : item
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // Edit a task
  const editTask = (indexToEdit, newText) => {
    const updatedTasks = tasks.map((item, index) =>
      index === indexToEdit ? { ...item, text: newText } : item
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>To-Do List</h1>
        <TaskForm addTask={addTask} />
        <TaskList
          tasks={tasks}
          toggleComplete={toggleComplete}
          handleDelete={handleDelete}
          editTask={editTask}
        />
      </header>
    </div>
  );
}

export default App;
