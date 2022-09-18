import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { updateTask } from '../../store/actions/task.action'

export const Dates = ({ task, groupId, setActionModal }) => {
  const dispatch = useDispatch()
  const [selectedDate, handleDateChange] = useState(new Date())

  const onAddDueDate = () => {
    const dueDate = new Date(selectedDate).getTime()

    if (task.dueDate) {
      task.dueDate.date = dueDate
    } else {
      task.dueDate = {
        date: dueDate,
        isDone: false,
      }
    }

    dispatch(updateTask(groupId, task))
    setActionModal(null)
  }

  const onRemoveDueDate = () => {
    task.dueDate = null
    dispatch(updateTask(groupId, task))
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
