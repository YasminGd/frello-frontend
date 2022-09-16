import { IoCloseOutline } from 'react-icons/io5'
import { Cover } from './action-modal-cmps/Cover'
import { Attachment } from './action-modal-cmps/Attachment'

export const ActionModal = ({ data, task, onUpdateTask }) => {
  const { type, pos } = data
  const modalStyle = { left: pos.left + 'px', top: pos.bottom + 'px' }

  const getActionCmp = (type) => {
    switch (type) {
      case 'Attachment':
        return <Attachment />
      case 'Cover':
        return <Cover task={task} onUpdateTask={onUpdateTask} />

      default:
        break
    }
  }
  return (
    <section className="action-modal" style={modalStyle}>
      <div className="title-container">
        <p>{type === 'Attachment' ? 'Attach from...' : type}</p>
        <span>
          <IoCloseOutline onClick={() => setActionModal(null)} />
        </span>
      </div>
      {getActionCmp(type)}
    </section>
  )
}
