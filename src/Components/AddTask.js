import Modal from "react-modal";
import React from "react";

export default function AddTask(prop) {
  const { isOpen, onClose, onAddTask } = prop;

  const handleCloseModal = () => {
    onClose();
  };

  const AddTask = () => {
    // Generate a unique key
    const key = Date.now().toString();
    const newItem = { Name: "Task" + key, taskKey: key };
    onAddTask(newItem);

    handleCloseModal();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={handleCloseModal}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={handleCloseModal}
          style={{ cursor: "pointer", padding: "5px" }}
        >
          X
        </button>
      </div>
      <button onClick={AddTask}>Add Task</button>
    </Modal>
  );
}
