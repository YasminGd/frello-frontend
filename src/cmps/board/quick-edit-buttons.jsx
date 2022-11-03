import { useRef } from 'react'
import { BsPerson, BsSquareHalf } from 'react-icons/bs'
import { AiOutlineTag, AiOutlineClockCircle } from 'react-icons/ai'
import { BsCardHeading } from 'react-icons/bs'
import { useLocation, useNavigate } from 'react-router-dom'
import { GoArchive } from 'react-icons/go'
import { removeTask } from '../../store/actions/task.action'
import { useDispatch } from 'react-redux'
import React from 'react'
import { utilService } from '../../services/util.service'

export const QuickEditButtons = ({ setQuickEdit, groupId, task, actionModal, setActionModal }) => {

  const location = useLocation()
  const dispatch = useDispatch()
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
      iconCmp: <BsSquareHalf
        className="icon"
        style={{
          transform: 'rotate(0.25turn) translateY(-5%) translateX(10%)',
        }}
      />
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

  const onOpenActionModal = (ev, type, ref) => {
    ev.preventDefault()
    if (actionModal?.type === type) return setActionModal(null)
    const pos = utilService.getModalPosition(type, ref)
    setActionModal({ type, pos })
  }

  const onOpenTaskDetails = () => {
    setQuickEdit(null)
    navigate(`${location.pathname}/${groupId}/${task.id}`)
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
    </React.Fragment >
  )
}
