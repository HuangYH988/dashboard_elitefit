import React, { useState, useEffect } from "react";
import { Task } from "./Components/Task";
import AddTask from "./Components/AddTask";

export function HomePage() {
  const [taskList, setTaskList] = useState([]);
  const [isAddTask, setIsAddTask] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (taskList.length === 0) {
          const tasksFromLocalStorage = Object.keys(localStorage).map((key) =>
            JSON.parse(localStorage.getItem(key))
          );

          setTaskList(tasksFromLocalStorage);
        }
      } catch (error) {
        console.error("Error: ", error.message);
      }
    };

    fetchData();
  }, [taskList]);

 

  const openModal = (type) => {
    switch (type) {
      case "Add":
        setIsAddTask(true);
        break;
      default:
        break;
    }
  };

  const closeModal = (type) => {
    switch (type) {
      case "Add":
        setIsAddTask(false);
        break;
      default:
        break;
    }
  };

  const addTaskToList = (newTask) => {
    setTaskList((prevTaskList) => [...prevTaskList, newTask]);
    localStorage.setItem(newTask.taskKey, JSON.stringify(newTask));
  };

  const deleteTask = (taskToDelete) => {
    setTaskList((prevTaskList) =>
      prevTaskList.filter((task) => task.taskKey !== taskToDelete)
    );
    localStorage.removeItem(taskToDelete);
  };

  return (
    <div className="App">
      {console.log(taskList)}
      <header className="App-header">
        <h1>Task Dashboard</h1>
      </header>
      <div className="App-body">
        Tasks go here:
        <button onClick={() => openModal("Add")}>Add Task</button>
        <AddTask isOpen={isAddTask} onClose={() => closeModal("Add")}  onAddTask={addTaskToList} taskList={taskList}/>
        <button>Filter</button>
        {taskList.map((task, index) => (
          <Task
            key={index}
            taskName={task.Name}
            keyValue={task.taskKey}
            onDelete={deleteTask} // Pass deleteTask function as onDelete prop
          />
        ))}
      </div>
    </div>
  );
}
