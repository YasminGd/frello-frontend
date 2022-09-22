import { useRef, useState } from 'react'
import { TaskList } from '../task-list.jsx'
import { DynamicTextarea } from '../dynamic-textarea.jsx'
import { BsPlusLg } from 'react-icons/bs'
import { ActionModal } from '../action-modal.jsx'

//prettier-ignore
export const GroupPreview = ({ group, addItem, removeItem, provided, isDragging }) => {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [actionModal, setActionModal] = useState(null)
  const btnCloseRef = useRef()

  const onToggleAdd = () => {
    setIsAddOpen(!isAddOpen)
  }

  const onOpenActionModal = (type, ref) => {
    if (actionModal?.type === type) return setActionModal(null)
    const rect = ref.current.getBoundingClientRect()
    const pos = { bottom: rect.bottom + 8, left: rect.left }
    setActionModal({ type, pos })
  }

  const textareaStyle = { width: "100%", height: "32px", fontSize: "14px" }

  return (
    <section
      className={`group-preview ${isDragging ? 'dragging' : ''}`}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
    >
      <section className="group-title">
        <DynamicTextarea
          entity={group}
          type={'group'}
          groupId={group.id}
          style={textareaStyle}
        />
        <button ref={btnCloseRef} onClick={() => onOpenActionModal('List actions', btnCloseRef)}>…</button>
      </section>
      <TaskList
        tasks={group.tasks}
        groupId={group.id}
        removeItem={removeItem}
        addItem={addItem}
        isAddOpen={isAddOpen}
        onToggleAdd={onToggleAdd}
      />
      {!isAddOpen &&
        <button className="add-task-button" onClick={onToggleAdd}>
          <span><BsPlusLg />Add a card</span>
        </button>
      }
      {actionModal && <ActionModal
        setActionModal={setActionModal}
        data={actionModal}
        removeItem={removeItem}
        groupId={group.id}
      />}
    </section>
  )
} 