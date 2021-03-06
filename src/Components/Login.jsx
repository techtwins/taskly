import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../redux/user';

export default function Login() {
  const [state, setState] = useState({ username: "", password: "" })
  const { username, password } = state
  const dispatch = useDispatch()

  const changeHandler = e => {
    const key = e.target.name
    const value = e.target.value
    setState({ ...state, [key]: value })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(state))
  }
  
  return (
    <>
      <form onSubmit={submitHandler}>
        <h1>Log In</h1>
        <input required type="text" value={username} name="username" onChange={changeHandler} placeholder="Username" />
        <input required type="password" value={password} name="password" onChange={changeHandler} placeholder="Password" />
        <br />
        <button style={{ marginTop: "40px"}}>Log In</button>
      </form>
    </>
  )
}
