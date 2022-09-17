import { useState } from 'react'
import { AddItem } from './add-item.jsx'
import { TaskList } from './task-list.jsx'
import { DynamicTextarea } from './dynamic-textarea.jsx'
import { BsThreeDots } from 'react-icons/bs'
import { AiOutlinePlus } from 'react-icons/ai'

export const GroupPreview = ({ group, addItem, removeItem, provided }) => {
  const [isAddOpen, setIsAddOpen] = useState(false)

  const onToggleAdd = () => {
    setIsAddOpen(!isAddOpen)
  }

  const textareaStyle = { width: "100%", height: "32px", fontSize: "14px" }

  return (
    <section
      className="group-preview"
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
        <button onClick={() => removeItem(group.id)}>…</button>
      </section>
      <TaskList
        tasks={group.tasks}
        groupId={group.id}
        removeItem={removeItem}
      />
      {isAddOpen ? (
        <AddItem
          onToggleAdd={onToggleAdd}
          addItem={addItem}
          groupId={group.id}
        />
      ) : (
        <button className="add-task-button" onClick={onToggleAdd}>
          <span><AiOutlinePlus />Add a card</span>
        </button>
      )}
    </section>
  )
}
