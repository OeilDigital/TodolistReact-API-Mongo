import { useEffect, useState } from "react";
import "./Tasks.css";
import TaskRow from "./TaskRow";
import TaskForm from "./TaskForm";
import { getTaskList } from '../../api/TaskListFromDB';
import axios from 'axios';

export default function Tasks({
  refreshTask,
  updateSelectedTask,
  refreshUpdatedTask,
}) {
  const [tasks, setTasks] = useState([getTaskList()]);
  // Fonction de requete GET de toutes les taches de l'utilisateur courant
  async function getTaskListLoad() {
    const tasklistFromDB = await getTaskList();
    setTasks(tasklistFromDB)
  }
  useEffect(() => {
    getTaskListLoad();
  }, []);


  useEffect(() => {
    refreshUpdatedTask(tasks);
  }, [tasks])

  function addTask(newTask) {
    setTasks([...tasks, newTask]);
    refreshTask(newTask);
  }

  function toggleEditTask(task) {
    setTasks(
      tasks.map((t) => (t.id === task.id ? { ...t, editable: !t.editable } : t))
    );
  }


  async function deleteTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
    tasks.forEach((t) => {
      if (t.id === id) {
        const idDB = t.id;
        const token = sessionStorage.getItem('token');
        (async () => await axios.delete(`http://localhost:3001/api/tasklist/${idDB}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }))();
      }
    })
  }

  return (
    <>
      <h2 className="text-center h2Task">Ajouter une nouvelle tache</h2>
      <TaskForm className="taskForm" addTask={addTask} />
      <table className="table table-dark table-hover table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl table-responsive-xxl">
        <thead>
          <tr>
            <th className="th">Nom de la tache</th>
            <th className="th">Domaine</th>
            <th className="th">Niveau de priorité</th>
            <th className="th">Modifier</th>
            <th className="th">Effacer</th>
            <th className="th">Valider</th>
            <th className="th">Détails</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              deleteTask={() => deleteTask(task.id)}
              toggleEditTask={() => toggleEditTask(task)}
              updateSelectedTask={() => {
                updateSelectedTask(task.id);
              }}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
