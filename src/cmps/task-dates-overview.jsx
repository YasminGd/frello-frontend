import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { utilService } from '../services/util.service'
import { updateTask } from '../store/actions/task.action'
import { MdKeyboardArrowDown } from 'react-icons/md'

export const TaskDatesOverview = ({ task, groupId, onOpenActionModal }) => {
  const dispatch = useDispatch()
  const btnDatesRef = useRef()

  const getDueWarnSpan = (task) => {
    if (task.dueDate.isDone) {
      return <span className="due-sticker completed">completed</span>
    }

    const then = new Date(task.dueDate.date)
    const now = new Date()
    const msBetweenDates = then.getTime() - now.getTime()
    const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000)

    if (hoursBetweenDates < 0) {
      return <span className="due-sticker overdue">overdue</span>
    }
    if (hoursBetweenDates < 24) {
      return <span className="due-sticker soon">due soon</span>
    }
  }

  const handleChange = ({ target }) => {
    if (target.type === 'checkbox') {
      if (target.checked) task.dueDate.isDone = true
      else if (!target.checked) {
        task.dueDate.isDone = false
      }
      dispatch(updateTask(groupId, task))
    }
  }

  return (
    <div className="task-dates-overview">
      <h3 className="task-dates-overview-title">Due Date</h3>
      <div className="due-date-badge">
        <input type="checkbox" onChange={handleChange} checked={task.dueDate.isDone} className="checkbox" />
        <div className="due-date-container">
          <button onClick={() => onOpenActionModal('Dates', btnDatesRef)} ref={btnDatesRef}>
            <span>{utilService.dueDateTimeFormat(task.dueDate.date)}</span>
            {getDueWarnSpan(task)}
            <MdKeyboardArrowDown />
          </button>
        </div>
      </div>
    </div>
  )
}
