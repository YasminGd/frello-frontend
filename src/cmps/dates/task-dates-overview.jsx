import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { utilService } from '../../services/util.service'
import { updateTask } from '../../store/actions/task.action'
import { MdKeyboardArrowDown } from 'react-icons/md'

export const TaskDatesOverview = ({ task, groupId, onOpenActionModal }) => {
  task = structuredClone(task)
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
      const activityTxt = `marked the due date on ${task.title} ${task.dueDate.isDone ? 'complete' : 'incomplete'}`
      dispatch(updateTask(groupId, task, activityTxt))
    }
  }

  return (
    <div className="task-dates-overview">
      <h3 className="task-dates-overview-title">Due Date</h3>
      <div className="due-date-badge">
        <label htmlFor="date-overview" className="checkbox-container">
          <input id="date-overview" type="checkbox" onChange={handleChange} checked={task.dueDate.isDone} className="checkbox" />
          <span className="checkmark"></span>
        </label>
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
