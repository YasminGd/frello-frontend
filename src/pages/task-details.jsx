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
  const actionBtns = [
    { type: 'Members', ref: btnMembersRef, iconCmp: <BsPerson className="icon" /> },
    { type: 'Labels', ref: btnLabelsRef, iconCmp: <AiOutlineTag className="icon" /> },
    { type: 'Checklist', ref: btnChecklistRef, iconCmp: <BsCheck2Square className="icon" /> },
    { type: 'Dates', ref: btnDatesRef, iconCmp: <AiOutlineClockCircle className="icon" /> },
    { type: 'Attachment', ref: btnAttachmentRef, iconCmp: <ImAttachment className="icon" /> },
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
    dispatch(updateTask(groupId, taskId, task))
  }

  const onGoBack = () => {
    navigate(-1)
  }

  const onOpenActionModal = (type, ref) => {
    if (actionModal) return setActionModal(null)
    const rect = ref.current.getBoundingClientRect()
    const pos = { bottom: rect.bottom, left: rect.left }
    setActionModal({ type, pos })
  }

  //prettier-ignore
  return (
        <React.Fragment>
            <section className="task-details">
                <button className="close-task-details" onClick={onGoBack}><IoCloseOutline /></button>
                <section className="task-header">
                    <GrCreditCard className="header-icon" />
                    <textarea name=""
                        value={titleTxt}
                        onChange={handleChange}
                        onKeyPress={handleUserKeyPress}
                        onBlur={setTaskTitle} />
                    <div className="sub-title">in list {group.title}</div>
                </section>

                <div className="task-body">
                    <section className="task-content">
                        <section className="task-description">
                            <div className="description-header">
                                {/* stopped here for desc*/}
                            </div>
                            <div className="description-body"></div>
                        </section>
                    </section>

                    <section className="task-sidebar">
                        <h3 className="sidebar-title">Add to card</h3>

                        {actionBtns.map(btn => (
                            <button className="btn-sidebar"
                                onClick={() => onOpenActionModal(btn.type, btn.ref)}
                                ref={btn.ref}>
                                {btn.iconCmp}
                                {btn.type}
                            </button>
                        ))}
                    </section>
                </div>

            </section>

            {console.log('actionModal: ', actionModal)}
            {actionModal && <ActionModal data={actionModal} />}
            <section onClick={onGoBack} className="screen"></section>
        </React.Fragment>
    )
}
