import React from "react";
import { useState } from "react";
import EditTask from "./EditTask";

export function Task(props) {
  const { task, onDelete, editTask } = props;
  const [isEditOpen, setIsEditOpen] = useState(false);
 

  const handleDelete = () => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this task? Changes are irreversible."
    );

    // If user confirms, proceed with deletion
    if (isConfirmed) {
      onDelete(task.taskKey);
    }
  };

  const checkStatus = (date) => {
    const currentTime = new Date(date);
    const dueTime = new Date(task.Due);
    if (task.Completed) {
      return "Completed";
    } else if (currentTime > dueTime) {
      return "overdued";
    } else if (!task.Assigned) {
      return "unassigned";
    } else {
      return "in-progress";
    }
  };

  const openEdit = () => {
    setIsEditOpen(true);
  };
  const closeEdit = () => {
    setIsEditOpen(false);
  };

  return (
    <div className={`Task-${checkStatus(Date.now())}`} >
      <h4>{task.Name}</h4>
      <h5>Description: </h5>
      <p className="Text-content">{task.Description}</p>
      <h5>Due date: </h5>
      <p className="Text-content">{task.Due}</p>
      <h5>Priority level: </h5>
      <p className="Text-content">{task.Priority}</p>
      <h5>Assigned to: </h5>
      <p className="Text-content">{task.Assigned}</p>
      <h5>Status: {checkStatus(Date.now())}</h5>
      <button className="Add-button" onClick={openEdit}>
        Edit Task
      </button>
      <EditTask
        isOpen={isEditOpen}
        onClose={closeEdit}
        task={task}
        editTask={editTask}
      />
      <button className="Add-button" onClick={handleDelete}>
        Delete Task
      </button>{" "}
      {/* Attach onClick event */}
    </div>
  );
}
