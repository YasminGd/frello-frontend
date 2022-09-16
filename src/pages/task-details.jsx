import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { IoCloseOutline } from 'react-icons/io5'
import { GrCreditCard } from 'react-icons/gr'
import { BsPerson, BsCheck2Square } from 'react-icons/bs'
import { AiOutlineTag, AiOutlineClockCircle } from 'react-icons/ai'
import { ImAttachment } from 'react-icons/im'
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
  console.log('TaskDetails ~ actionModal', actionModal)

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

  const onOpenActionModal = (type) => {
    setActionModal(type)
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
                    <button className="btn-sidebar"><BsPerson className="icon" />Members</button>
                    <button className="btn-sidebar"><AiOutlineTag className="icon" />Labels</button>
                    <button className="btn-sidebar"><BsCheck2Square className="icon" />Checklist</button>
                    <button className="btn-sidebar"><AiOutlineClockCircle className="icon" />Dates</button>
                    <button className="btn-sidebar" onClick={() => onOpenActionModal('Attach from...')}><ImAttachment className="icon" />Attachments</button>
                </section>
            </div>

        </section>
        {actionModal && <ActionModal type={actionModal}/>}
        <section onClick={onGoBack} className="screen"></section>
    </React.Fragment>
  )
}
