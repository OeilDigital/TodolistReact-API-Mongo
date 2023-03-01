import axios from "axios";
import { useState } from "react";
import "./TaskPlanning.css";
import DateTimePicker from "./DatetimePicker";

export default function TaskPlanning({ selectedTask }) {
    const [planning, setPlanning] = useState(selectedTask.planning);
    const [editModal, setEditModal] = useState(selectedTask.editableModal);
    console.log(planning);

    function toggleEditModal() {
        setEditModal((selectedTask.editableModal = !selectedTask.editableModal));
    }

    function handleChange(e) {
        const inputValue = e.target.value;
        setPlanning(inputValue);
        selectedTask.planning = inputValue;
        return;
    }

    // function updatePlanningInDB() {
    //     if (!selectedTask.editableModal) {
    //         const token = sessionStorage.getItem('token');
    //         (async () => await axios.put(`http://localhost:3001/api/tasklist/updatePlanning`, selectedTask, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         }))();
    //     }
    // }

    return (
        <div id="task-planning-modal" className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{selectedTask.name}</h5>
                        {/* <h6 className="priorityLevel">{selectedTask.priorityLevel}</h6> */}
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>

                    <div className="modal-body">
                        {!selectedTask.editableModal ? (
                            <p>{selectedTask.planning}</p>
                        ) : (
                            // <textarea
                            //     className="taskDetailsTextArea"
                            //     type="text-area"
                            //     name="textDetail"
                            //     onChange={handleChange}
                            //     value={details}
                            // />
                            <DateTimePicker
                                // className="taskDetailsTextArea"
                                // type="text-area"
                                name="planningTask"
                                onChange={handleChange}
                                value={planning}
                            />
                        )}
                        <br />
                        <br />
                        <button
                            onClick={() => {
                                toggleEditModal();
                                // updatePlanningInDB();
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