import { useState } from 'react'
import { AddItem } from './add-item.jsx'
import { GroupPreview } from './group-preview.jsx'
import { Draggable, Droppable } from 'react-beautiful-dnd'

export const GroupList = ({ board, addItem, removeItem }) => {
  const [isAddOpen, setIsAddOpen] = useState(false)

  const onToggleAdd = () => {
    setIsAddOpen(!isAddOpen)
  }

  return (
    <Droppable droppableId={board._id} direction="horizontal">
      {(provided) => (
        <section
          className="group-list"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {board.groups.map((group, index) => (
            <Draggable draggableId={group.id} key={group.id} index={index}>
              {(provided) => (
                <GroupPreview
                  provided={provided}
                  key={group.id}
                  group={group}
                  addItem={addItem}
                  removeItem={removeItem}
                />
              )}
            </Draggable>
          ))}
          {provided.placeholder}
          {isAddOpen ? (
            <AddItem onToggleAdd={onToggleAdd} addItem={addItem} />
          ) : (
            <button className="add-task-button" onClick={onToggleAdd}>
              Add another list
            </button>
          )}
        </section>
      )}
    </Droppable>
  )
}
