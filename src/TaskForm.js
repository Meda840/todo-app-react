import React, { useState } from "react";

function TaskForm({ addTask }) {
  const [task, setTask] = useState(""); // State to hold the input value

  // Function to handle task submission
  const handleSubmit = () => {
    if (task.trim()) {
      addTask(task);
      setTask(""); // Clear the input field
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add a new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={handleSubmit}>Add Task</button>
    </div>
  );
}

export default TaskForm;
