import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TaskList from "./components/TaskList";
import CompletedTasks from "./components/CompletedTasks";
import AppBar from "./components/AppBar";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage when the app starts
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Add new task
  const addTask = (task) => {
    const updatedTasks = [...tasks, { text: task, completed: false }];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // Delete a task
  const deleteTask = (indexToDelete) => {
    const filteredTasks = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(filteredTasks);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  };

  // Toggle task completion
  const toggleComplete = (indexToToggle) => {
    const updatedTasks = tasks.map((task, index) =>
      index === indexToToggle ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <Router>
      <div className="App">
        <AppBar />

        <Routes>
          <Route
            path="/"
            element={
              <TaskList
                tasks={tasks}
                addTask={addTask}
                deleteTask={deleteTask}
                toggleComplete={toggleComplete}
              />
            }
          />
          <Route path="/completed" element={<CompletedTasks tasks={tasks} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
