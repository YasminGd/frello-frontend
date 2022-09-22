import { useEffect, useRef, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { IoChevronBack } from 'react-icons/io5'
import { Cover } from '../task-details/cover'
import { Attachment } from '../attachment/attachment'
import { CheckList } from '../checklist/check-list'
import { Dates } from '../dates/dates'
import { Labels } from '../labels/labels'
import { Members } from '../members/members'
import { Users } from '../board/users'
import { ListActions } from '../board/list-actions'

export const ActionModal = ({ data, task, onUpdateTask, setActionModal, groupId, removeItem }) => {
  const [isLabelsEdit, setIsLabelsEdit] = useState(null)

  const modalRef = useRef()

  useEffect(() => {
    document.onmousedown = (ev) => {
      handleClickOutside(ev)
    }
    return () => {
      document.onmousedown = null
    }
  }, [])

  const handleClickOutside = (ev) => {
    if (modalRef.current && !modalRef.current.contains(ev.target)) {
      setActionModal(null)
    }
  }

  const onToggleLabelEdit = () => {
    setIsLabelsEdit((prevState) => !prevState)
  }

  const { type, pos } = data
  const modalStyle = { left: pos.left + 'px', top: pos.bottom + 'px' }

  const getActionCmp = (type) => {
    switch (type) {
      case 'Attachment':
        return <Attachment task={task} setActionModal={setActionModal} onUpdateTask={onUpdateTask} groupId={groupId} />

      case 'Cover':
        return <Cover task={task} onUpdateTask={onUpdateTask} />

      case 'Labels':
        return (
          <Labels task={task} groupId={groupId} onToggleLabelEdit={onToggleLabelEdit} isLabelsEdit={isLabelsEdit} />
        )

      case 'Checklist':
        return <CheckList setActionModal={setActionModal} />

      case 'Dates':
        return <Dates task={task} setActionModal={setActionModal} onUpdateTask={onUpdateTask} groupId={groupId} />

      case 'Members':
        return <Members task={task} groupId={groupId} setActionModal={setActionModal} />

      case 'Users':
        return <Users />

      case 'List actions':
        return <ListActions groupId={groupId} removeItem={removeItem} setActionModal={setActionModal} />

      default:
        break
    }
  }

  const getTitle = () => {
    switch (type) {
      case 'Attachment':
        return 'Attach from...'

      case 'Checklist':
        return 'Add checklist'

      case 'Labels':
        if (isLabelsEdit) return 'Edit label'
        return 'Labels'

      case 'Users':
        return 'Invite to board'

      default:
        return type
    }
  }

  const title = getTitle()

  return (
    <section className="action-modal" style={modalStyle} onClick={(ev) => ev.stopPropagation()} ref={modalRef}>
      <div className="title-container">
        <p>{title}</p>
        {isLabelsEdit && <IoChevronBack className="edit-go-back" onClick={onToggleLabelEdit} />}
        <span>
          <IoCloseOutline onClick={() => setActionModal(null)} />
        </span>
      </div>
      {getActionCmp(type)}
    </section>
  )
}