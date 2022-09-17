import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { IoCloseOutline } from 'react-icons/io5'
import { GrCreditCard } from 'react-icons/gr'
import { BsPerson, BsCheck2Square } from 'react-icons/bs'
import { AiOutlineTag, AiOutlineClockCircle } from 'react-icons/ai'
import { ImAttachment } from 'react-icons/im'
import { TbRectangle } from 'react-icons/tb'
import { boardService } from '../services/board.service'
import { useDispatch } from 'react-redux'
import { ActionModal } from '../cmps/action-modal'
import { updateTask } from '../store/actions/task.action'
import { TaskDescription } from '../cmps/task-description'
import { TaskAttachments } from '../cmps/task-attachments'

export const TaskDetails = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { groupId, taskId } = useParams()
  const board = useSelector((state) => state.boardModule.board)

  const group = board.groups.find((group) => group.id === groupId)
  const task = group.tasks.find((task) => task.id === taskId)

  const [titleTxt, setTitleTxt] = useState(task.title)
  const [actionModal, setActionModal] = useState(null)

  // Refs for action modal position calculation
  const btnAttachmentRef = useRef()
  const btnMembersRef = useRef()
  const btnLabelsRef = useRef()
  const btnChecklistRef = useRef()
  const btnDatesRef = useRef()
  const btnCoverRef = useRef()

  const actionBtns = [
    { type: 'Members', ref: btnMembersRef, iconCmp: <BsPerson className="icon" /> },
    { type: 'Labels', ref: btnLabelsRef, iconCmp: <AiOutlineTag className="icon" /> },
    { type: 'Checklist', ref: btnChecklistRef, iconCmp: <BsCheck2Square className="icon" /> },
    { type: 'Dates', ref: btnDatesRef, iconCmp: <AiOutlineClockCircle className="icon" /> },
    { type: 'Attachment', ref: btnAttachmentRef, iconCmp: <ImAttachment className="icon" /> },
    { type: 'Cover', ref: btnCoverRef, iconCmp: <TbRectangle className="icon" /> },
  ]

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
    console.log(rect);
    const pos = { bottom: rect.bottom + 8, left: rect.left }
    setActionModal({ type, pos })
  }

  //prettier-ignore
  return (
    <React.Fragment>
      <section onClick={onGoBack} className="screen">
        <section className="task-details-container">
          <section className="task-details" onClick={(ev) => ev.stopPropagation()}>
            {task.style?.bgColor && <section className="cover-color" style={{ backgroundColor: task.style.bgColor }}>
            </section>}
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
                <TaskDescription task={task} groupId={groupId} />
                {task.attachments?.length > 0 && <TaskAttachments task={task} groupId={groupId} />}
              </section>

              <section className="task-sidebar">
                <h3 className="sidebar-title">Add to card</h3>

                {actionBtns.map(btn => (
                  <button className="btn-sidebar"
                    onClick={() => onOpenActionModal(btn.type, btn.ref)}
                    key={btn.type}
                    ref={btn.ref}>
                    {btn.iconCmp}
                    {btn.type}
                  </button>
                ))}
              </section>
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
