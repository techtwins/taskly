import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newFriend, removeFriend } from '../redux/user';
import '../styles/rightnav.css'
import Search from './Search';

export default function AllUsers({ friends }) {

  const allUsers = useSelector(({ currentUser }) => currentUser.users);
  const currentUser = useSelector(({ currentUser }) => currentUser.currentUser)
  const [searchValue, setSearchValue] = useState("")
  const dispatch = useDispatch()

  const addFriend = (e) => {
    dispatch(newFriend({ 
      requestor_id: currentUser.id,
      receiver_id: e.target.id
    }))
  }

  const unFriend = (e) => {
    dispatch(removeFriend(currentUser.id, e.target.id))
    window.location.reload()
  }

  const alreadyFriends = (id) => {
    if (friends){
      let arr = friends.map(user => user.id)
      return (
        arr.includes(id)
      )
    }
  }

  const searchHandler = (e) => {
    setSearchValue(e.target.value)
  }

  const filteredUsers = () => {
    return allUsers.filter(user => (user.name.toLowerCase().includes(searchValue.toLowerCase())))
  }

  const usersMap = filteredUsers().map(user => (
    <div style={{ width: "100%", marginTop: "10px" }} className="allUsersDiv" key={user.id}>
      {
        currentUser.id === user.id
          ?
          null 
          :
          <>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <h4 style={{ display: "inline-block", marginTop: "50px", marginLeft: "20px" }}>{user.name}</h4>
              <img style={{ width: "110px", height: "110px", objectFit: "contain", transform: "scale(0.3)", borderRadius: "46px", marginLeft: "-40px", marginRight: "-20px" }} src={user.img} alt="user img" /><br />
            </div>
            {user.id !== currentUser.id && !alreadyFriends(user.id)
              ?
              <button id={user.id} className="addFriendBtn" onClick={addFriend}>Add</button>
              :
              null
            }
            {user.id !== currentUser.id && alreadyFriends(user.id)
              ?
              <button style={{ backgroundColor: "black", color: "white", fontWeight: 800 }} id={user.id} onClick={unFriend} className="addFriendBtn">Delete</button>
              :
              null
            }
            <hr className="friendDivHr" />
          </>
      }
    </div>
  ))

  return (
    <>
      <Search friendsSearch="friendsSearch" searchHandler={searchHandler} searchValue={searchValue} />
      <div style={{ height: "400px", overflowY: "auto", paddingLeft: "10px", paddingBottom: "30px" }}>
        {usersMap}
      </div>
    </>
  )
}
