import { useState } from 'react'
import { AddItem } from '../task-details-cmps/add-item.jsx'
import { GroupPreview } from './group-preview.jsx'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { AiOutlinePlus } from 'react-icons/ai'

export const GroupList = ({ board, addItem, removeItem }) => {
  const [isAddOpen, setIsAddOpen] = useState(false)

  const onToggleAdd = () => {
    setIsAddOpen(!isAddOpen)
  }
  return (
    <Droppable droppableId={board._id} direction="horizontal" type="group">
      {(provided) => (
        <section
          className="group-list"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {board.groups.map((group, index) => (
            <Draggable draggableId={group.id} key={group.id} index={index}>
              {(provided, snapshot) => (
                <GroupPreview
                  provided={provided}
                  key={group.id}
                  group={group}
                  addItem={addItem}
                  removeItem={removeItem}
                  isDragging={snapshot.isDragging}
                />
              )}
            </Draggable>
          ))}
          {provided.placeholder}
          {isAddOpen ? (
            <AddItem onToggleAdd={onToggleAdd} addItem={addItem} />
          ) : (
            <button className="add-task-button" onClick={onToggleAdd}>
              <span><AiOutlinePlus />Add another list</span>
            </button>
          )}
        </section>
      )}
    </Droppable>
  )
}
