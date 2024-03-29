import Modal from "react-modal";
import React, { useState } from "react";

export default function Filter(prop) {
  const { isOpen, onClose, onFilter } = prop;
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [priority, setPriority] = useState("");

  const handleCloseModal = () => {
    onClose();
  };

  const FilterCond = () => {
    const filterCond = {
      Name: taskName,
      Description: taskDescription,
      Assigned: assignTo,
      Priority: priority,
    };

    onFilter(filterCond);
    handleCloseModal();
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
          <h2>Filter tasks by:</h2>
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
            <h3 className="text-headers">Task description containing:</h3>
            <textarea
              type="text"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder=""
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
              <option key="4" value="">
                No specification
              </option>
            </select>
          </div>
          <button className="Add-button" onClick={FilterCond}>
            Filter
          </button>
        </div>
      </div>
    </Modal>
  );
}
