import axios from "axios";
import { useState } from "react";
import "./TaskRow.css";

export default function TaskRow({
  task,
  deleteTask,
  toggleEditTask,
  updateSelectedTask,
}) {
  const [name, setName] = useState(task.name);
  const [area, setArea] = useState(task.area);
  const [priorityLevel, setPriorityLevel] = useState(task.priorityLevel);
  const [validated, setValidated] = useState(task.validated);

  function handleChange(e) {
    const input = e.target;
    switch (e.target.name) {
      case "name":
        setName(input.value);
        task.name = input.value;
        return;
      case "area":
        setArea(input.value);
        task.area = input.value;
        return;
      case "priorityLevel":
        setPriorityLevel(input.value);
        task.priorityLevel = input.value;
        return;
      default:
        return;
    }
  }

  function validation() {
    setValidated((task.validated = !task.validated))
  }

  function updateInDB() {
    if (task.editable) {
      const token = sessionStorage.getItem('token');
      (async () => await axios.put(`http://localhost:3001/api/tasklist/`, task, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }))();
    }
  }

  function persistantValidationInDB() {
    const token = sessionStorage.getItem('token');
    (async () => await axios.put(`http://localhost:3001/api/tasklist/validated`, task, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }))();
  }

  return (
    <tr>
      {task.editable ? (
        <>
          <td className="text-center">
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={name}
            />
          </td>
          <td className="text-center">
            <input
              type="text"
              name="area"
              onChange={handleChange}
              value={area}
            />
          </td>
          <td className="text-center">
            <input
              type="number"
              name="priorityLevel"
              onChange={handleChange}
              value={priorityLevel}
            />
          </td>
        </>
      ) : !task.validated ? (
        <>
          <td className="text-center">{task.name}</td>
          <td className="text-center">{task.area}</td>
          <td className="text-center">{parseInt(task.priorityLevel)}</td>
        </>
      ) : (
        <>
          <td className="text-center">
            <i>
              <strike>{task.name}</strike>
            </i>
          </td>
          <td className="text-center">
            <i>
              <strike>{task.area}</strike>
            </i>
          </td>
          <td className="text-center">
            <i>
              <strike>{parseInt(task.priorityLevel)}</strike>
            </i>
          </td>
        </>
      )}
      <td className="text-center">
        <button onClick={() => {
          toggleEditTask();
          updateInDB();
        }} className="btn btn-sm btn-info me-1" title="Modifier">
          {task.editable ? "✔︎" : "✎"}
        </button>
      </td>
      <td className="text-center">
        <button onClick={() => {
          deleteTask(task.id);
        }} className="btn btn-sm btn-danger" title="Supprimer">
          ✖︎
        </button>
      </td>
      <td className="text-center">
        <button onClick={() => {
          validation();
          persistantValidationInDB();
        }}
          className="btn btn-sm btn-success validationBtn" title="Valider">
          &#10004;
        </button>
      </td>
      <td className="text-center">
        <button
          onClick={updateSelectedTask}
          data-bs-target="#task-details-modal"
          data-bs-toggle="modal"
          title="Details"
          className="btn btn-sm btn-light rounded-circle"
        >
          &#128270;
        </button>
      </td>
    </tr>
  );
}
