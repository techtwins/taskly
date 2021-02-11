import React, { useState } from 'react'
import Rodal from 'rodal'
import 'rodal/lib/rodal.css';
import Profile from '../Components/Profile'

export default function ProfileModal() {
  const [visible, setVisible] = useState(false)

  const show = () => {
    console.log("showing profile modal")
    setVisible(true)
  }

  const hide = () => {
    setVisible(false)
  }

  return (
    <>
      <span onClick={show} className="mySettings">My Settings</span>
      <Rodal
        customStyles={{ borderRadius: "20px", display: "flex" }} 
        height={420}
        width={700}
        visible={visible} 
        onClose={hide} 
        animation="door" 
        showCloseButton={false}
      >
        <Profile hide={hide} />
      </Rodal>
    </>
  )
}
