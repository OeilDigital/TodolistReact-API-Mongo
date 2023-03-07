import "./TaskForm.css";
import { useEffect, useState } from 'react';
import DateTimePickerStart from './DatetimePickerStart';
import DateTimePickerEnd from './DatetimePickerEnd'

export default function TaskForm({ addTask }) {
  const [size, setSize] = useState(true);
  const [labelOne, setLabelOne] = useState('Début');
  const [labelTwo, setLabelTwo] = useState('Fin');

  const [nameOne, setNameOne] = useState('startDate');
  const [nameTwo, setNameTwo] = useState('endDate');

  const [dateTimeStart, setDateTimeStart] = useState(null);
  const [dateTimeEnd, setDateTimeEnd] = useState(null);

  console.log('Date start', dateTimeStart)
  console.log('Date end', dateTimeEnd)
  window.addEventListener('resize', function () {
    if (window.innerWidth < 1075) {
      setSize(false);
    } else {
      setSize(true);
    }
  });

  // const pickerOne = document.querySelector("#pickerOne");
  // const pickerTwo = document.querySelector("#pickerTwo");


  useEffect(() => {
    setDateTimeStart(null);
  }, [])

  useEffect(() => {
    setDateTimeEnd(null);
  }, [])

  function handleDateStartChange(newPropValue) {
    setDateTimeStart(newPropValue);
  }

  function handleDateEndChange(newPropValue) {
    setDateTimeEnd(newPropValue);
  }

  function rebootStart() {
    setDateTimeStart(null);
  }

  function rebootEnd() {
    setDateTimeEnd(null);
  }

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
      startDate: dateTimeStart,
      endDate: dateTimeEnd
    };

    console.log(newTask)

    addTask(newTask);
    form.reset();
    setTimeout(() => {
      h1.classList.add("h1Effect")
    }, 100);

    h1.classList.remove("h1Effect");
    rebootStart();
    rebootEnd();
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
          required
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
      <div className="input-block">
        {getInputForm("name", "Nom de la tache")}
        {getInputForm("area", "Domaine")}
        {getInputForm("priorityLevel", "Niveau de Priorité", "number")}
      </div>
      <div className="datepicker-block">
        <DateTimePickerStart
          key="pickerOne"
          className="datepicker"
          id="pickerOne"
          label={labelOne}
          name={nameOne}
          value={dateTimeStart}
          handleDateStartChange={handleDateStartChange}
        />
        <DateTimePickerEnd
          key="pickerTwo"
          className="datepicker"
          id="pickerTwo"
          label={labelTwo}
          name={nameTwo}
          value={dateTimeEnd}
          handleDateEndChange={handleDateEndChange}
          dateTimeStart={dateTimeStart}
        />
      </div>
      <button type="submit" className="btn btn-info submitForm">
        {size ? "Ajouter" : "+"}
      </button>
    </form>
  );
}
