import React, { useState } from 'react'
import { createNewTask } from '../redux/task';
import { useDispatch } from 'react-redux'
import Select from 'react-select'

export default function TaskForm({ lists, hide }) {

  const [state, setState] = useState({ name: "", description: "", date: "", time: "", list_id: null })
  const { name, date, time, description } = state
  const dispatch = useDispatch()

  const submitHandler = e => {
    e.preventDefault()
    dispatch(createNewTask(state))
    setState({ name: "", description: "", date: "", time: "", list_id: null })
  }

  const changeHandler = e => {
    const key = e.target.name
    const value = e.target.value
    setState({ ...state, [key]: value })
  }

  const options = lists.map(list => {
    return { key: list.id, label: list.name || list.id, value: list.id }
  })

  const listClickHandler = (e) => {
    setState({ list_id: e.value })
  }

  const customStyles = {
    control: (provided, {isFocused}) => ({
      ...provided,
      lineHeight: "1.21428571em",
      padding: "0.17857143em 1em",
      fontSize: "1em",
      background: "#fff",
      border: isFocused ? "1px solid #ffd15d" : null,
      boxShadow: isFocused ? "1px solid #ffd15d" : null,
      '&:hover': {
        border: isFocused ? null : null
      },
      color: "rgba(0, 0, 0, 0.87)",
      borderRadius: "20px",
    }),
    menu: (provided) => ({
      ...provided,
      lineHeight: "1.21428571em",
      overflowY: "auto",
      height: "200px",
      padding: "0.17857143em 1em",
      fontSize: "1em",
      background: "#fff",
      border: "1px solid rgba(34, 36, 38, 0.15)",
      color: "rgba(0, 0, 0, 0.87)",
      borderRadius: "20px",
      boxShadow: "0 0 0 0 transparent inset"
    }),
    option: (provided) => ({
      ...provided,
      borderRadius: "20px",
      marginTop: "5px",
      marginBottom: "10px",
      paddingLeft: "20px"
    })
  }

  return (
    <div className="taskForm">
      <form onSubmit={submitHandler}>
        <h1>Choose List</h1>
        <Select styles={customStyles} classNamePrefix="reactSelect" options={options} onChange={listClickHandler}/>
        <h1>Name</h1>
        <input type="text" name="name" value={name} onChange={changeHandler} placeholder="Name"></input><br /><br />
        <h1>Date</h1>
        <input type="date" name="date" value={date} onChange={changeHandler} placeholder="Date"></input><br /><br />
        <h1>Time</h1>
        <input type="time" name="time" value={time} onChange={changeHandler} placeholder="Time"></input><br /><br />
        <h1>Description</h1>
        <textarea type="text" name="description" value={description} onChange={changeHandler} placeholder="Description"></textarea><br /><br />
        <button
          onClick={hide}
          className="modalSubmitBtn">Submit</button>
      </form>
    </div>
  )
}
