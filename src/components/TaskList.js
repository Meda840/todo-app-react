import React, { useState } from "react";

function TaskList({ tasks, addTask, deleteTask, toggleComplete }) {
  const [taskInput, setTaskInput] = useState("");

  // Handle input change
  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  // Handle adding a new task
  const handleAddTask = () => {
    if (taskInput.trim()) {
      addTask(taskInput);
      setTaskInput(""); // Clear input
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add a new task"
        value={taskInput}
        onChange={handleInputChange}
      />
      <button onClick={handleAddTask}>Add Task</button>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <span
              onClick={() => toggleComplete(index)}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
