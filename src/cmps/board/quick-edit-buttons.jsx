import { useRef } from 'react'
import { BsPerson } from 'react-icons/bs'
import { AiOutlineTag, AiOutlineClockCircle } from 'react-icons/ai'
import { ImAttachment } from 'react-icons/im'
import { BsCardHeading } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export const QuickEditButtons = ({ onOpenActionModal, groupId, task }) => {
  // Refs for action modal position calculation
  const btnAttachmentRef = useRef()
  const btnMembersRef = useRef()
  const btnLabelsRef = useRef()
  // const btnChecklistRef = useRef()
  const btnDatesRef = useRef()
  // const btnCoverRef = useRef()

  const actionBtns = [
    {
      type: 'Edit labels',
      ref: btnLabelsRef,
      iconCmp: <AiOutlineTag className="icon" />,
    },
    {
      type: 'Change members',
      ref: btnMembersRef,
      iconCmp: <BsPerson className="icon" />,
    },
    {
      type: 'Change cover',
      ref: btnDatesRef,
      iconCmp: <AiOutlineClockCircle className="icon" />,
    },
    {
      type: 'Remove task',
      ref: btnAttachmentRef,
      iconCmp: <ImAttachment className="icon" />,
    },
  ]

  const openModal = (ev, type, ref) => {
    ev.stopPropagation()
    onOpenActionModal(type, ref)
  }

  const stop = (ev) => {
    ev.stopPropagation()
    ev.preventDefault()
  }
  return (
    <section className="quick-edit-buttons" onClick={stop}>
      <button className="" key="Open card">
        <Link to={`${groupId}/${task.id}`}>
          <BsCardHeading />
          Open card
        </Link>
      </button>
      {actionBtns.map((btn) => (
        <button className="" onClick={(ev) => openModal(ev, btn.type, btn.ref)} key={btn.type} ref={btn.ref}>
          {btn.iconCmp}
          {btn.type}
        </button>
      ))}
    </section>
  )
}
