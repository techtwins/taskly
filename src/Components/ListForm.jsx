import React, { useState } from 'react'
import { createNewList } from '../redux/list';
import { useDispatch, useSelector } from 'react-redux'

export default function ListForm({  hide }) {
  const currentUser = useSelector(({ currentUser }) => currentUser.currentUser);

  const [state, setState] = useState({ user_id: null, name: "", color: "" })
  const dispatch = useDispatch()
  const { name, color } = state

  const submitHandler = e => {
    e.preventDefault()
    dispatch(createNewList(currentUser.id, name, color))
    setState({ name: "", color: "" })
  }

  const changeHandler = e => {
    const key = e.target.name
    const value = e.target.value
    setState({ ...state, [key]: value })
  }

  return (
    <div className="listForm">
      <form onSubmit={submitHandler}> 
        <h1>Name</h1>
        <input type="text" name="name" value={state.name} onChange={changeHandler} placeholder="Name"></input><br /><br />
        <h1>Color</h1>
        <input type="color" name="color" value={state.color} onChange={changeHandler} placeholder="Color" style={{ marginLeft: "12px"}}></input><br /><br />
        <button
          onClick={hide}
          className="modalSubmitBtn">Submit</button>
      </form>
    </div>
  )
}
