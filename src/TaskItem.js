import React, { useState } from "react";

function TaskItem({ task, index, toggleComplete, handleDelete, editTask }) {
  const [isEditing, setIsEditing] = useState(false); // State to handle edit mode
  const [editValue, setEditValue] = useState(task.text); // State to hold the edited value

  // Save the edited task
  const handleSaveEdit = () => {
    editTask(index, editValue);
    setIsEditing(false); // Exit edit mode
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <span
            onClick={() => toggleComplete(index)}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            {task.text}
          </span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => handleDelete(index)}>Delete</button>
        </>
      )}
    </li>
  );
}

export default TaskItem;
