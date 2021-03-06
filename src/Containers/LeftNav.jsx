import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllTasks } from '../redux/task'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import '../styles/leftnav.css'

moment.locale("en")
const localizer = momentLocalizer(moment)

export default function LeftNav() {

  const tasks = useSelector(({ tasks }) => tasks.tasks)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllTasks())
  }, [dispatch])

  const allTasks = () => (
    tasks.map(task => {
      if (task.completed) {
        return null
      } else {
        return {
          title: task.name,
          start: moment(task.date),
          end: moment(task.date),
          allDay: true,
          resourceId: task.id,
          tooltipAccessor: task.name,
          color: task.list.color
        }
      }
    })
  )
  const eventStyleGetter = (event) => {
    var backgroundColor = event.color;
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: '20px',
      paddingTop: "5px",
      color: 'white',
      fontWeight: "600",
      textAlign: "center",
      border: '1px solid #7e7d7d',
      display: 'block'
    };
    return {
      style: style
    };
  }

  const refreshPage = () => {
    window.location.reload()
  }

  return (
    <div className="leftCont">
      <img onClick={refreshPage} style={{ cursor: "pointer", marginTop: "15px", marginLeft: "40px", marginBottom: "50px" }} src="./Logo.png" alt="logo" />
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        defaultDate={new Date()}
        events={allTasks()}
        eventPropGetter={eventStyleGetter}
        views={['month', 'day', 'week']}
        drilldownView="week"
        style={{ marginTop: "110px", marginRight: "30px", marginLeft: "30px", height: 700, boxShadow: "15px 25px #e5e6eb5e" }}
      />
    </div>
  )
}

