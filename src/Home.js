import React, { useState, useEffect } from "react";
import { Task } from "./Components/Task";
import AddTask from "./Components/AddTask";
import Filter from "./Components/Filter"

export function HomePage() {
  const [taskList, setTaskList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [filterCond, setFilterCond] = useState("");
  const [isAddTask, setIsAddTask] = useState(false);
  const [isFilter, setIsFilter] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetches data from localStorage at initial render
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
    const filterData = () => {
      let filtered = [...taskList];

      // Filters taskList if any of the filter conditions are present
      if (filterCond.Name) {
        filtered = filtered.filter((task) =>
          task.Name.includes(filterCond.Name)
        );
      }
      if (filterCond.Description) {
        filtered = filtered.filter((task) =>
          task.Description.includes(filterCond.Description)
        );
      }
      if (filterCond.Assigned) {
        filtered = filtered.filter(
          (task) => task.Assigned === filterCond.Assigned
        );
      }
      if (filterCond.Priority) {
        filtered = filtered.filter(
          (task) => task.Priority === filterCond.Priority
        );
      }

      setFilteredList(filtered);
    };

    fetchData();
    if (filterCond) {
      filterData();
    }
  }, [taskList, filterCond]);

  //This function opens the corresponding Modal
  const openModal = (type) => {
    switch (type) {
      case "Add":
        setIsAddTask(true);
        break;
      case "Filter":
        setIsFilter(true);
        break;
      default:
        break;
    }
  };

  // closes the corrsponding Modal
  const closeModal = (type) => {
    switch (type) {
      case "Add":
        setIsAddTask(false);
        break;
      case "Filter":
        setIsFilter(false);
        break;
      default:
        break;
    }
  };

  // When a new task is added, update taskList accordingly
  const addTaskToList = (newTask) => {
    setTaskList((prevTaskList) => [...prevTaskList, newTask]);
    localStorage.setItem(newTask.taskKey, JSON.stringify(newTask));
  };

  // Update localStorage when a task is editted
  const editTaskList = (edittedTask) => {
    localStorage.setItem(edittedTask.taskKey, JSON.stringify(edittedTask));
  };

  const deleteTask = (taskToDelete) => {
    setTaskList((prevTaskList) =>
      prevTaskList.filter((task) => task.taskKey !== taskToDelete)
    );
    localStorage.removeItem(taskToDelete);
  };

  // Updating filter condition
  const changeFilterCond = (cond) => {
    setFilterCond(cond);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Dashboard</h1>
      </header>
      <div className="App-body">
        <div className="Display-buttons">
          <button className="Top-buttons" onClick={() => openModal("Add")}>
            Add Task
          </button>
          <AddTask
            isOpen={isAddTask}
            onClose={() => closeModal("Add")}
            onAddTask={addTaskToList}
            taskList={taskList}
          />
          <button className="Top-buttons" onClick={() => openModal("Filter")}>
            Filter
          </button>
          <Filter
            isOpen={isFilter}
            onClose={() => closeModal("Filter")}
            onFilter={changeFilterCond}
          />
        </div>

        {filterCond ? (
          <div>
            <h3>Upcoming tasks:</h3>
            <div className="Display-tasks">
              {filteredList
                .filter(
                  (task) =>
                    !task.Completed && new Date(task.Due) > new Date(Date.now())
                )
                .map((task, index) => (
                  <Task
                    key={index}
                    task={task}
                    editTask={editTaskList}
                    onDelete={deleteTask}
                  />
                ))}
            </div>
            <h3>Completed tasks:</h3>
            <div className="Display-tasks">
              {filteredList
                .filter((task) => task.Completed)
                .map((task, index) => (
                  <Task
                    key={index}
                    task={task}
                    editTask={editTaskList}
                    onDelete={deleteTask}
                  />
                ))}
            </div>
            <h3>Overdue tasks:</h3>
            <div className="Display-tasks">
              {filteredList
                .filter(
                  (task) =>
                    !task.Completed && new Date(task.Due) < new Date(Date.now())
                )
                .map((task, index) => (
                  <Task
                    key={index}
                    task={task}
                    editTask={editTaskList}
                    onDelete={deleteTask}
                  />
                ))}
            </div>
          </div>
        ) : (
          <div>
            <h3>Upcoming tasks:</h3>
            <div className="Display-tasks">
              {taskList
                .filter(
                  (task) =>
                    !task.Completed && new Date(task.Due) > new Date(Date.now())
                )
                .map((task, index) => (
                  <Task
                    key={index}
                    task={task}
                    editTask={editTaskList}
                    onDelete={deleteTask}
                  />
                ))}
            </div>
            <h3>Completed tasks:</h3>
            <div className="Display-tasks">
              {taskList
                .filter((task) => task.Completed)
                .map((task, index) => (
                  <Task
                    key={index}
                    task={task}
                    editTask={editTaskList}
                    onDelete={deleteTask}
                  />
                ))}
            </div>
            <h3>Overdue tasks:</h3>
            <div className="Display-tasks">
              {taskList
                .filter(
                  (task) =>
                    !task.Completed && new Date(task.Due) < new Date(Date.now())
                )
                .map((task, index) => (
                  <Task
                    key={index}
                    task={task}
                    editTask={editTaskList}
                    onDelete={deleteTask}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
