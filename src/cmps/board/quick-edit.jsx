import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateTask } from '../../store/actions/task.action'
import { QuickEditButtons } from './quick-edit-buttons'

export const QuickEdit = ({ task, groupId, setQuickEdit, pos }) => {

  const dispatch = useDispatch()
  const [taskTitle, setTaskTitle] = useState(task.title)

  const handleChange = ({ target }) => {
    setTaskTitle(target.value)
  }

  const saveTask = () => {
    task.title = taskTitle
    setQuickEdit(null)
    dispatch(updateTask(groupId, task))
  }

  const modalStyle = { top: pos.top + 'px', left: pos.left + 'px' }

  return (
    <React.Fragment>
      <section className="quick-edit" style={modalStyle} onClick={(ev) => { ev.preventDefault() }}>
        <section className="main-edit">
          <textarea
            value={taskTitle}
            autoFocus
            onChange={handleChange}
          >
          </textarea>
          <button onClick={saveTask} className="btn blue">Save</button>
        </section>
        <QuickEditButtons
          task={task}
          groupId={groupId}
          setQuickEdit={setQuickEdit}
        />
      </section>
      <section className="screen-edit" onClick={(ev) => { ev.preventDefault(); setQuickEdit(null) }}></section>
    </React.Fragment>
  )
}
