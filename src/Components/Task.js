import React from "react";

export function Task(props) {
  const { taskName, value, onDelete } = props;

  const handleDelete = () => {
    onDelete(taskName); // Call the onDelete function passed from the parent component
  };

  return (
    <div className="Task">
      <h3>Name: {taskName}</h3>
      <h5>Description: {value}</h5>
      <h5>Due date:</h5>
      <h5>Priority level:</h5>
      <h5>Assigned to:</h5>
      <button>Edit Task</button>
      <button onClick={handleDelete}>Delete Task</button> {/* Attach onClick event */}
    </div>
  );
}