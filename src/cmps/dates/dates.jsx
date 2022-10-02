import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { updateTask } from '../../store/actions/task.action'
import { utilService } from '../../services/util.service'

export const Dates = ({ task, groupId, setActionModal }) => {
  task = structuredClone(task)
  const dispatch = useDispatch()
  const [selectedDate, handleDateChange] = useState(new Date())

  const onAddDueDate = (ev) => {
    const dueDate = new Date(selectedDate).getTime()

    let activityTxt
    const dueString = utilService.dueDateTimeFormat(dueDate)
    if (task.dueDate) {
      task.dueDate.date = dueDate
      activityTxt = `set ${task.title} to be due ${dueString}`
    } else {
      task.dueDate = {
        date: dueDate,
        isDone: false,
      }
      activityTxt = `changed the due date of ${task.title} to ${dueString}`
    }

    dispatch(updateTask(groupId, task, activityTxt))
    setActionModal(null)
  }

  const onRemoveDueDate = () => {
    task.dueDate = null
    dispatch(updateTask(groupId, task, `removed the due date from ${task.title}`))
    setActionModal(null)
  }

  return (
    <section className="dates">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker disableToolbar variant="static" margin="normal" value={selectedDate} onChange={handleDateChange} />
      </MuiPickersUtilsProvider>

      <button onClick={onAddDueDate} className="action-btn save-btn">
        Save
      </button>
      <button onClick={onRemoveDueDate} className="action-btn remove-btn">
        Remove
      </button>
    </section>
  )
}
