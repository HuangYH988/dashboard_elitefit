import Modal from "react-modal";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function EditTask(prop) {
  const { isOpen, onClose, task, editTask } = prop;
  const [taskName, setTaskName] = useState(task.Name);
  const [taskDescription, setTaskDescription] = useState(task.Description);
  const [assignTo, setAssignTo] = useState(task.Assigned);
  const [priority, setPriority] = useState(task.Priority);
  const [dueDate, setDueDate] = useState(task.Due);

  const handleCloseModal = () => {
    onClose();
    window.location.reload();
  };

  const EditTask = () => {
    // Generate a unique key
    if (!taskName) {
      alert("Please insert a task name.");
    }

    const edittedItem = {
      Name: taskName,
      taskKey: task.taskKey,
      Description: taskDescription,
      Assigned: assignTo,
      Priority: priority,
      Due: dueDate,
      Completed: task.Completed,
    };
    editTask(edittedItem);
    handleCloseModal();
  };
  const CompleteTask = () => {
    const isConfirmed = window.confirm(
      "Please confirm that the task is completed. This change is irreversible"
    );
    if (isConfirmed) {
      const edittedItem = {
        Name: task.Name,
        taskKey: task.taskKey,
        Description: task.Description,
        Assigned: task.Assigned,
        Priority: task.Priority,
        Due: task.Due,
        Completed: true,
      };
      editTask(edittedItem);
      handleCloseModal();
    }
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={handleCloseModal}>
      <div className="Modal">
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={handleCloseModal}
            style={{
              cursor: "pointer",
              padding: "5px",
              width: "30px",
              height: "30px",
              border: "2px solid black",
              borderRadius: "15px",
            }}
          >
            X
          </button>
        </div>
        <div className="Modal-content">
          <div className="text-field">
            <h3 className="text-headers">Task name:</h3>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder={taskName}
            />
          </div>
          <div className="text-field">
            <h3 className="text-headers">Task description:</h3>
            <textarea
              type="text"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder={taskDescription}
            />
          </div>
          <div className="text-field">
            <h3 className="text-headers">Due date:</h3>
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
            />
          </div>

          <div className="text-field">
            <h3 className="text-headers">Assign to:</h3>
            <input
              type="text"
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
              placeholder={assignTo}
            />
          </div>
          <div className="text-field">
            <h3 className="text-headers">Priority:</h3>
            <select value={priority} onChange={handlePriorityChange}>
              <option key="1" value="high">
                High
              </option>
              <option key="2" value="mid">
                Mid
              </option>
              <option key="3" value="low">
                Low
              </option>
            </select>
          </div>
          <button className="Complete-button" onClick={CompleteTask}>
            Completed
          </button>
          <br />
          <button className="Add-button" onClick={EditTask}>
            Edit Task
          </button>
        </div>
      </div>
    </Modal>
  );
}
