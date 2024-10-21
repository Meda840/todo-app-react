import React from "react";

function CompletedTasks({ tasks }) {
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div>
      <h2>Completed Tasks</h2>
      {completedTasks.length === 0 ? (
        <p>No completed tasks yet.</p>
      ) : (
        <ul>
          {completedTasks.map((task, index) => (
            <li key={index}>{task.text}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CompletedTasks;
