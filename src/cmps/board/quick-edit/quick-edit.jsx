import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateTask } from 'store/actions/task.action'
import { QuickEditButtons } from './quick-edit-buttons'
import { ActionModal } from '../../global/action-modal'
import { useSelector } from 'react-redux'

export const QuickEdit = ({ task, groupId, setQuickEdit, pos }) => {
  const dispatch = useDispatch()
  const [taskTitle, setTaskTitle] = useState(task.title)
  const [actionModal, setActionModal] = useState(null)

  // Need to work on task from store so components will rerender at all changes.
  // especially on optimistic errors
  const taskId = task.id
  let board = useSelector((state) => state.boardModule.board)
  board = structuredClone(board)
  task = board.groups.find(group => group.id === groupId).tasks.find(task => task.id === taskId)

  const handleChange = ({ target }) => {
    setTaskTitle(target.value)
  }

  const saveTask = () => {
    task.title = taskTitle
    setQuickEdit(null)
    dispatch(updateTask(groupId, task))
  }

  const onUpdateTask = (task) => {
    setQuickEdit(task)
    dispatch(updateTask(groupId, task, undefined, undefined))
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
          <textarea
            value={taskTitle}
            autoFocus={window.innerWidth >= 1200}
            onFocus={(ev) => ev.target.select()}
            onChange={handleChange}
          ></textarea>
          <button onClick={saveTask} className="btn blue">
            Save
          </button>
        </section>
        <QuickEditButtons
          task={task}
          groupId={groupId}
          setQuickEdit={setQuickEdit}
          actionModal={actionModal}
          setActionModal={setActionModal}
        />
      </section>
      <section
        className="screen-edit"
        onClick={(ev) => {
          ev.preventDefault()
          setQuickEdit(null)
        }}
      ></section>
      {actionModal && (
        <ActionModal
          setActionModal={setActionModal}
          data={actionModal}
          groupId={groupId}
          task={task}
          onUpdateTask={onUpdateTask}
          setQuickEdit={setQuickEdit}
        />
      )}
    </React.Fragment>
  )
}
