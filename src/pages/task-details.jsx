import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { IoCloseOutline } from 'react-icons/io5'
import { GrCreditCard } from 'react-icons/gr'
import { useDispatch } from 'react-redux'
import { ActionModal } from '../cmps/action-modal'
import { updateTask } from '../store/actions/task.action'
import { TaskDescription } from '../cmps/task-description'
import { TaskAttachments } from '../cmps/task-attachments'
import { TaskDetailsSidebar } from '../cmps/task-details-sidebar'
import { CheckListList } from '../cmps/checklist-list'
import { TaskDetailsOverview } from '../cmps/task-details-overview'

export const TaskDetails = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { groupId, taskId } = useParams()
  const board = useSelector((state) => state.boardModule.board)

  const group = board.groups.find((group) => group.id === groupId)
  const task = group.tasks.find((task) => task.id === taskId)

  const [titleTxt, setTitleTxt] = useState(task.title)
  const [actionModal, setActionModal] = useState(null)

  const handleChange = ({ target }) => {
    const { value } = target
    setTitleTxt(value)
  }

  const handleUserKeyPress = (ev) => {
    if (ev.key === 'Enter' && !ev.shiftKey) ev.target.blur()
  }

  const setTaskTitle = () => {
    task.title = titleTxt
    dispatch(updateTask(groupId, task))
  }

  const onUpdateTask = (task) => {
    dispatch(updateTask(groupId, task))
  }

  const onGoBack = () => {
    navigate(-1)
  }

  const onOpenActionModal = (type, ref) => {
    if (actionModal?.type === type) return setActionModal(null)
    const rect = ref.current.getBoundingClientRect()
    const pos = { bottom: rect.bottom + 8, left: rect.left }
    setActionModal({ type, pos })
  }

  //prettier-ignore
  return (
    <React.Fragment>
      <section onClick={onGoBack} className="screen">
        <section className="task-details-container">
          <section className="task-details" onClick={(ev) => ev.stopPropagation()}>
            {task.style?.coverImg && <section className="cover-color img">
              <img src={task.style.coverImg} />
            </section>}
            {task.style?.bgColor && <section className="cover-color" style={{ backgroundColor: task.style.bgColor }}></section>}
            <button className="close-task-details" onClick={onGoBack}><IoCloseOutline /></button>
            <section className="task-header">
              <textarea name=""
                value={titleTxt}
                onChange={handleChange}
                onKeyPress={handleUserKeyPress}
                onBlur={setTaskTitle} />
              <div className="sub-title">in list {group.title}</div>
              <GrCreditCard className="header-icon" />
            </section>

            <div className="task-body">
              <section className="task-content">
                <TaskDetailsOverview onOpenActionModal={onOpenActionModal} task={task} groupId={groupId}/>
                <TaskDescription task={task} groupId={groupId} />
                {task.attachments?.length > 0 && <TaskAttachments task={task} groupId={groupId} />}
                {task.checklists?.length > 0 && <CheckListList task={task} groupId={groupId} />}
              </section>
              <TaskDetailsSidebar onOpenActionModal={onOpenActionModal} />
            </div>
          </section>
        </section>
        {actionModal && <ActionModal onUpdateTask={onUpdateTask}
          setActionModal={setActionModal}
          data={actionModal}
          task={task}
          groupId={groupId} />}
      </section>
    </React.Fragment>
  )
}
