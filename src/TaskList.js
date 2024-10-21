import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, toggleComplete, handleDelete, editTask }) {
  return (
    <ul>
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          index={index}
          task={task}
          toggleComplete={toggleComplete}
          handleDelete={handleDelete}
          editTask={editTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;
