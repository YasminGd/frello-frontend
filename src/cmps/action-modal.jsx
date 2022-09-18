import { useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { IoChevronBack } from "react-icons/io5"
import { Cover } from './action-modal-cmps/Cover'
import { Attachment } from './action-modal-cmps/Attachment'
import { BoardSideMenu } from './board-side-menu'
import { getByTitle } from '@testing-library/react'
import { CheckList } from './action-modal-cmps/check-list'
import { Labels } from './action-modal-cmps/labels'

export const ActionModal = ({
  data,
  task,
  onUpdateTask,
  setActionModal,
  groupId,
}) => {

  const [isEdit, setIsEdit] = useState(null)
  const onToggleEdit = () => {
    setIsEdit(prevState => !prevState)
  }

  const { type, pos } = data
  const modalStyle = { left: pos.left + 'px', top: pos.bottom + 'px' }

  const getActionCmp = (type) => {
    switch (type) {
      case 'Attachment':
        return (
          <Attachment
            task={task}
            setActionModal={setActionModal}
            onUpdateTask={onUpdateTask}
            groupId={groupId}
          />
        )
      case 'Cover':
        return <Cover task={task} onUpdateTask={onUpdateTask} />

      case 'Labels':
        return <Labels task={task} groupId={groupId} onToggleEdit={onToggleEdit} isEdit={isEdit} />

      case 'Checklist':
        return <CheckList />

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

      default:
        return type
    }
  }

  const title = getTitle()

  return (
    <section className="action-modal" style={modalStyle} onClick={ev => ev.stopPropagation()}>
      <div className="title-container">
        <p>{title}</p>
        {isEdit && <IoChevronBack className="edit-go-back" onClick={onToggleEdit} />}
        <span>
          <IoCloseOutline onClick={() => setActionModal(null)} />
        </span>
      </div>
      {getActionCmp(type)}
    </section>
  )
}
