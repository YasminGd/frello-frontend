import { useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { IoChevronBack } from 'react-icons/io5'
import { Cover } from './action-modal-cmps/Cover'
import { Attachment } from './action-modal-cmps/Attachment'
import { CheckList } from './action-modal-cmps/check-list'
import { Dates } from './action-modal-cmps/dates'
import { Labels } from './action-modal-cmps/labels'
import { Members } from './action-modal-cmps/members'
import { Users } from './action-modal-cmps/users'

export const ActionModal = ({ data, task, onUpdateTask, setActionModal, groupId }) => {

  const [isLabelsEdit, setIsLabelsEdit] = useState(null)

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
        return <Labels task={task} groupId={groupId} onToggleLabelEdit={onToggleLabelEdit} isLabelsEdit={isLabelsEdit} />

      case 'Checklist':
        return <CheckList />

      case 'Dates':
        return <Dates task={task} setActionModal={setActionModal} onUpdateTask={onUpdateTask} groupId={groupId} />

      case 'Members':
        return <Members task={task} groupId={groupId} setActionModal={setActionModal} />

      case 'Users':
        return <Users task={task} groupId={groupId} setActionModal={setActionModal} />
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
    <section className="action-modal" style={modalStyle} onClick={(ev) => ev.stopPropagation()}>
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
