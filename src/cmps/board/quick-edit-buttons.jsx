import { useRef, useState } from 'react'
import { BsPerson } from 'react-icons/bs'
import { AiOutlineTag, AiOutlineClockCircle } from 'react-icons/ai'
import { ImAttachment } from 'react-icons/im'
import { BsCardHeading } from 'react-icons/bs'
import { useLocation, useNavigate } from 'react-router-dom'
import { GoArchive } from 'react-icons/go'
import { removeTask, updateTask } from '../../store/actions/task.action'
import { useDispatch } from 'react-redux'
import React from 'react'
import { ActionModal } from '../global/action-modal'
import { utilService } from '../../services/util.service'

export const QuickEditButtons = ({ setQuickEdit, groupId, task }) => {

  const location = useLocation()
  const dispatch = useDispatch()
  const [actionModal, setActionModal] = useState(null)
  const navigate = useNavigate()

  // Refs for action modal position calculation
  const btnLabelsRef = useRef()
  const btnMembersRef = useRef()
  const btnCoverRef = useRef()
  const btnDatesRef = useRef()

  const actionBtns = [
    {
      type: 'Labels',
      txt: 'Edit labels',
      ref: btnLabelsRef,
      iconCmp: <AiOutlineTag className="icon" />,
    },
    {
      type: 'Members',
      txt: 'Change members',
      ref: btnMembersRef,
      iconCmp: <BsPerson className="icon" />,
    },
    {
      type: 'Cover',
      txt: 'Change cover',
      ref: btnCoverRef,
      iconCmp: <ImAttachment className="icon" />,
    },
    {
      type: 'Dates',
      txt: 'Edit dates',
      ref: btnDatesRef,
      iconCmp: <AiOutlineClockCircle className="icon" />,
    },
  ]

  const onRemoveTask = () => {
    dispatch(removeTask(groupId, task.id))
    setQuickEdit(null)
  }

  const onUpdateTask = (task) => {
    dispatch(updateTask(groupId, task))
  }

  const onOpenActionModal = (ev, type, ref) => {
    ev.preventDefault()
    if (actionModal?.type === type) return setActionModal(null)
    const pos = utilService.getModalPosition(type, ref)
    setActionModal({ type, pos })
  }

  const onOpenTaskDetails = () => {
    setQuickEdit(null)
    navigate(`${location.pathname}+/${groupId}/${task.id}`)
  }

  return (
    <React.Fragment>
      <section className="quick-edit-buttons" >
        <button onClick={onOpenTaskDetails} className="" key="Open card">
          <BsCardHeading />
          Open card
        </button>
        {actionBtns.map((btn) => (
          <button className=""
            onClick={(ev) => onOpenActionModal(ev, btn.type, btn.ref)}
            key={btn.type}
            ref={btn.ref}
          >
            {btn.iconCmp}
            {btn.txt}
          </button>
        ))}
        <button
          onClick={onRemoveTask}
          className='btn-sidebar'
        >
          <GoArchive className="icon" />
          Delete
        </button>
      </section>
      {
        actionModal && <ActionModal
          setActionModal={setActionModal}
          data={actionModal}
          groupId={groupId}
          task={task}
          onUpdateTask={onUpdateTask}
        />
      }
    </React.Fragment >
  )
}
