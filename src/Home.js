import React, { useState, useEffect } from "react";
import { Task } from "./Components/Task";

export function HomePage() {
  const [taskList, setTaskList] = useState(
    JSON.parse(localStorage.getItem("taskList")) || []
  );
  const [tempCount, setTempCount] = useState(0);

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  const tempAddTask = () => {
    const newItem = { Name: "Task" + tempCount, otherValue1: tempCount };
    setTaskList((prevTaskList) => [...prevTaskList, newItem]);
    setTempCount(tempCount + 1);
  };

  const deleteTask = (taskNameToDelete) => {
    setTaskList(prevTaskList =>
      prevTaskList.filter(task => task.Name !== taskNameToDelete)
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Dashboard</h1>
      </header>
      <div className="App-body">
        Tasks go here:
        <button onClick={tempAddTask}>Add Task</button>
        {taskList.map((task, index) => (
          <Task
            key={index}
            taskName={task.Name}
            value={task.otherValue1}
            onDelete={deleteTask} // Pass deleteTask function as onDelete prop
          />
        ))}
      </div>
    </div>
  );
}