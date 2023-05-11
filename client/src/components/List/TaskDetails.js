import axios from "axios";
import { useState } from "react";
import "./TaskDetails.css";

export default function TaskDetails({ selectedTask }) {
  const [details, setDetails] = useState(selectedTask.details);
  const [editModal, setEditModal] = useState(selectedTask.editableModal);

  console.log('selectedTask', selectedTask)
  function toggleEditModal() {
    setEditModal((selectedTask.editableModal = !selectedTask.editableModal));
  }

  function handleChange(e) {
    const inputValue = e.target.value;
    setDetails(inputValue);
    selectedTask.details = inputValue;
    return;
  }

  function updateDetailsInDB() {
    if (!selectedTask.editableModal) {
      const token = sessionStorage.getItem('token');
      (async () => await axios.put(`http://localhost:3001/api/tasklist/updateDetails`, selectedTask, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }))();
    }
  }

  return (
    <div id="task-details-modal" className="modal fade">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{selectedTask.name}</h5>
            <h6 className="modal-title priorityLevel">{selectedTask.priorityLevel}</h6>
            <div className="date">
              <h6 className="modal-title dateStartinDetails">{selectedTask.startDate ? 'Début : ' + new Date(selectedTask.startDate).toLocaleString("fr") : ''}</h6>
              <h6 className="modal-title dateEndinDetails">{selectedTask.endDate ? 'Fin : ' + new Date(selectedTask.endDate).toLocaleString("fr") : ''}</h6>
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            {!selectedTask.editableModal ? (
              <p>{selectedTask.details}</p>
            ) : (
              <textarea
                className="taskDetailsTextArea"
                type="text-area"
                name="textDetail"
                onChange={handleChange}
                value={details}
              />
            )}
            <br />
            <br />
            <button
              onClick={() => {
                toggleEditModal();
                updateDetailsInDB();
              }}
              className="btn btn-sm btn-info me-1"
            >
              {selectedTask.editableModal ? "✔︎" : "✎"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
