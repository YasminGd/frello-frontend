import { IoCloseOutline } from 'react-icons/io5'
import { Cover } from './action-modal-cmps/Cover'
import { Attachment } from './action-modal-cmps/Attachment'
import { BoardSideMenu } from './board-side-menu'
import { CheckList } from './action-modal-cmps/check-list'
import { Dates } from './action-modal-cmps/Dates'
import { Labels } from './action-modal-cmps/labels'

export const ActionModal = ({ data, task, onUpdateTask, setActionModal, groupId }) => {
  const { type, pos } = data
  const modalStyle = { left: pos.left + 'px', top: pos.bottom + 'px' }

  const getActionCmp = (type) => {
    switch (type) {
      case 'Attachment':
        return <Attachment task={task} setActionModal={setActionModal} onUpdateTask={onUpdateTask} groupId={groupId} />
      case 'Cover':
        return <Cover task={task} onUpdateTask={onUpdateTask} />

      // case 'Labels':
      //   return <Labels />

      case 'Checklist':
        return <CheckList />

      case 'Dates':
        return <Dates task={task} setActionModal={setActionModal} onUpdateTask={onUpdateTask} groupId={groupId} />

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
    <section className="action-modal" style={modalStyle} onClick={(ev) => ev.stopPropagation()}>
      <div className="title-container">
        <p>{title}</p>
        <span>
          <IoCloseOutline onClick={() => setActionModal(null)} />
        </span>
      </div>
      {getActionCmp(type)}
    </section>
  )
}
