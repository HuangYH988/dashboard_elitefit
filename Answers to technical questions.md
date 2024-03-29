# How long did you spend on the coding test? 
I spent 3 days on this test, average number of hours spent on the test daily is about 5 hours.

# What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.
The most useful feature Javascript have added to the latest version to me is the with() method, which lets me add a new item to an existing array.

Sample code snipplet from code:
const addTaskToList = (newTask) => {
    // with() method adds the new task to taskList
    const newTaskList = taskList.with(taskList.length-1, newTask);
    setTaskList(newTaskList);
    localStorage.setItem(newTask.taskKey, JSON.stringify(newTask));
  };
This function let me add the new task created by user to my existing taskList array.

# How would you track down a performance issue in production? Have you ever had to do this?
I would first check for any error reports that could have resulted in performance issue. Afterward, I would check on any related codes and correct them accordingly.

# If you had more time, what additional features or improvements would you consider adding to the task management application?
I would add an authentication system for different users and only grant access to adding, editting and deleting of tasks to certain users. I may also move the application from local storage to a different backend server.