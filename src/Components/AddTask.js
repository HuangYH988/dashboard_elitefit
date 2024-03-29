import Modal from "react-modal";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddTask(prop) {
  const { isOpen, onClose, onAddTask } = prop;
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState(new Date());
  

  const handleCloseModal = () => {
    onClose();
  };

  const AddTask = () => {
    // Generate a unique key
    if (taskName.trim() === "") {
      // Show an alert if task name is empty
      alert("Task name is required.");
    } else {
      const key = Date.now().toString();
      const newItem = {
        Name: taskName,
        taskKey: key,
        Description: taskDescription,
        Assigned: assignTo,
        Priority: priority,
        Due: dueDate.toISOString(),
        Completed: false,
      };

      onAddTask(newItem);
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
              placeholder=""
            />
          </div>
          <div className="text-field">
            <h3 className="text-headers">Task description:</h3>
            <textarea
              type="text"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder=""
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
              placeholder=""
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
          <button className="Add-button" onClick={AddTask}>
            Add Task
          </button>
        </div>
      </div>
    </Modal>
  );
}
