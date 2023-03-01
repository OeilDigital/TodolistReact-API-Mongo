import "./TaskForm.css";
import { useState } from 'react';

export default function TaskForm({ addTask }) {
  const [size, setSize] = useState(true);

  window.addEventListener('resize', function () {
    if (window.innerWidth < 1075) {
      setSize(false);
    } else {
      setSize(true);
    }
  });

  function handleSubmit(e) {
    e.preventDefault();
    const h1 = document.querySelector('.mainTitle');
    const form = e.target;
    const newTask = {
      id: crypto.randomUUID(),
      name: form.name.value,
      user_id: sessionStorage.getItem('_id'),
      area: form.area.value,
      validated: false,
      priorityLevel: form.priorityLevel.value,
      details: '',
      editable: false,
    };

    addTask(newTask);
    form.reset();
    setTimeout(() => {
      h1.classList.add("h1Effect")
    }, 100);

    h1.classList.remove("h1Effect");
  }

  function getInputForm(name, placeholder, type = "text") {
    return (
      <div className="form-floating m-3">
        <input
          id={name}
          name={name}
          type={type}
          step={type === "number" ? "any" : ""}
          autoComplete="off"
          className="form-control"
          placeholder={placeholder}
        />
        <label htmlFor={name} className="form-label">
          {placeholder}
        </label>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="text-center taskRowForm"
      style={{ minWidth: "500px" }}
    >
      {getInputForm("name", "Nom de la tache")}
      {getInputForm("area", "Domaine")}
      {getInputForm("priorityLevel", "Niveau de Priorité", "number")}
      <button type="submit" className="btn btn-info submitForm">
        {size ? "Ajouter" : "+"}
      </button>
    </form>
  );
}
