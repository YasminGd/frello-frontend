import { IoCloseOutline } from 'react-icons/io5'
import { Cover } from './action-modal-cmps/Cover'
import { Attachment } from './action-modal-cmps/Attachment'
import { BoardSideMenu } from './board-side-menu'

export const ActionModal = ({
  data,
  task,
  onUpdateTask,
  setActionModal,
  groupId,
}) => {
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

      case 'Menu':
        return <BoardSideMenu />

      default:
        break
    }
  }
  return (
    <section className="action-modal" style={modalStyle} onClick={ev => ev.stopPropagation()}>
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
