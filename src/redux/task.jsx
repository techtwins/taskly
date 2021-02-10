import { createSlice } from '@reduxjs/toolkit'
const url = "http://localhost:3000/";

const taskSlice = createSlice({
  name: "task",
  initialState: { tasks: [] },
  reducers: {
    fetchTasks: (state, action) => {
      state.tasks = action.payload
    },
    createTask: (state, action) => {
      state.tasks = [ action.payload, ...state.tasks]
    },
    deleteTask: (state, action) => {
      const newArr = [...state.tasks]
      state.tasks = newArr.filter((task) => task.id !== action.payload)
    }, 
    updateTask: (state, action) => {
      let updatedState = [...state.tasks]
      const i = updatedState.findIndex((task) => task.id === action.payload.id)
      updatedState[i] = action.payload
      state.tasks = updatedState
    },
    toggleTask: (state, action) => {
      let newArr = [...state.tasks]
      const task = newArr.find(task => task.id === action.payload.id)
      if (task) {
        task.completed = !task.completed
      }
    }
  }
})

// actions
const { fetchTasks, createTask, deleteTask, updateTask, toggleTask } = taskSlice.actions

export const fetchAllTasks = () => {
  return function (dispatch) {
    fetch(`${url}tasks`)
    .then(r => r.json())
      .then(data => {
        console.log(data)
        dispatch(fetchTasks(data))
      })
  }
}

// export const fetchAllTasks = () => {
//   return function (dispatch) {
//     fetch(`${url}lists`)
//     .then(r => r.json())
//       .then(data => {
//         console.log("data on task action:", data)

//         data.map(list => {
//           return list.tasks.map(task => {
//             console.log("fetch map:", task)
//             return dispatch(fetchTasks(task))
//           })
//         })
//       })
//   }
// }

export const createNewTask = (task) => {
  return function (dispatch) {
    fetch(`${url}tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    })
      .then(r => r.json())
      .then(data => {
        const action = createTask(data)
        dispatch(action)
        console.log(data)
      })
  }
}

export const editTask = (taskId, taskObj) => {
  return function (dispatch) {
    fetch(`${url}tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskObj)
    })
      .then(r => r.json())
      .then(data => {
        const action = updateTask(data)
        dispatch(action)
        console.log("Updated task:", data)
    })
  }
}

export const deleteCurrentTask = (taskId) => {
  return function (dispatch) {
    fetch(`${url}tasks/${taskId}`, {
      method: "DELETE"
    })
    dispatch(deleteTask(taskId))
  }
}

export const toggleCompleted = (taskId, completed) => {
  return function (dispatch) {
    fetch(`${url}tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: completed })
    })
      .then(r => r.json())
      .then(data => {
        const action = toggleTask(data)
        dispatch(action)
        console.log("toggling in task action:", data)
      })
  }
}

// reducer
export default taskSlice.reducer