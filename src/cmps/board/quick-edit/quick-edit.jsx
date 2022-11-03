import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateTask } from 'store/actions/task.action'
import { QuickEditButtons } from './quick-edit-buttons'
import { ActionModal } from '../../global/action-modal'

export const QuickEdit = ({ task, groupId, setQuickEdit, pos }) => {
  task = structuredClone(task)
  const dispatch = useDispatch()
  const [taskTitle, setTaskTitle] = useState(task.title)
  const [actionModal, setActionModal] = useState(null)

  const handleChange = ({ target }) => {
    setTaskTitle(target.value)
  }

  const saveTask = () => {
    task.title = taskTitle
    setQuickEdit(null)
    dispatch(updateTask(groupId, task))
  }

  const onUpdateTask = (task) => {
    dispatch(updateTask(groupId, task))
  }

  const modalStyle = { top: pos.top + 'px', left: pos.left + 'px' }

  return (
    <React.Fragment>
      <section
        className="quick-edit"
        style={modalStyle}
        onClick={(ev) => {
          ev.preventDefault()
        }}
      >
        <section className="main-edit">
          <textarea value={taskTitle}
            autoFocus={window.innerWidth >= 1200}
            onFocus={(ev) => ev.target.select()}
            onChange={handleChange}></textarea>
          <button onClick={saveTask} className="btn blue">
            Save
          </button>
        </section>
        <QuickEditButtons
          task={task}
          groupId={groupId}
          setQuickEdit={setQuickEdit}
          actionModal={actionModal}
          setActionModal={setActionModal} />
      </section>
      <section
        className="screen-edit"
        onClick={(ev) => {
          ev.preventDefault()
          setQuickEdit(null)
        }}
      ></section>
      {
        actionModal && <ActionModal
          setActionModal={setActionModal}
          data={actionModal}
          groupId={groupId}
          task={task}
          onUpdateTask={onUpdateTask}
          setQuickEdit={setQuickEdit}
        />
      }
    </React.Fragment>
  )
}
