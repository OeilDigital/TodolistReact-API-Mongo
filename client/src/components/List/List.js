import Tasks from "./Tasks"
import TaskDetails from "./TaskDetails"
import { useState } from "react";
import axios from "axios";
import { CREATE_NEW_TASK_URL } from "../../config/config";


function List() {

  const [tasklist, setTasklist] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);
  console.log('tasklist from List', tasklist)

  function refreshTask(newTask) {
    // POST request using axios with async/await
    const token = sessionStorage.getItem('token');
    (async () => await axios.post(CREATE_NEW_TASK_URL, newTask, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }))();
    setTasklist([...tasklist, newTask]);
  }

  function refreshUpdatedTask(task) {
    setTasklist([...task]);
  }

  function updateSelectedTask(id) {
    setSelectedTask(
      tasklist.find(t => t.id === id)
    );
  }

  return <div className="app d-flex flex-column px-3">
    <Tasks
      key="tasks"
      refreshTask={refreshTask}
      updateSelectedTask={updateSelectedTask}
      refreshUpdatedTask={refreshUpdatedTask}
    />
    {selectedTask && <TaskDetails selectedTask={selectedTask} />}

  </div>;
}

export default List;
