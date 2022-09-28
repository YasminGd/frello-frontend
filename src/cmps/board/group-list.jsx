import { useState } from 'react'
import { AddItem } from '../global/add-item.jsx'
import { GroupPreview } from './group-preview.jsx'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { AiOutlinePlus } from 'react-icons/ai'
import { isEmpty } from 'lodash'

export const GroupList = ({ board, addItem, removeItem, placeholderProps, isBackgroundDark }) => {
  const [isAddOpen, setIsAddOpen] = useState(false)

  const onToggleAdd = () => {
    setIsAddOpen(!isAddOpen)
  }

  const themeStyle = isBackgroundDark ? '' : 'dark'
  return (
    <Droppable droppableId={board._id} direction="horizontal" type="group">
      {(provided, snapshot) => (
        // <div className="group-list-container">
        <section className="group-list" {...provided.droppableProps} ref={provided.innerRef}>
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
          {!isEmpty(placeholderProps) && snapshot.isDraggingOver && (
            <div
              className="placeholder"
              style={{
                position: 'absolute',
                top: placeholderProps.clientY,
                left: placeholderProps.clientX,
                height: placeholderProps.clientHeight,
                width: placeholderProps.clientWidth,
                backgroundColor: '#00000023',
                borderRadius: '3px',
              }}
            />
          )}
          {isAddOpen ? (
            <AddItem onToggleAdd={onToggleAdd} addItem={addItem} />
          ) : (
            <button className={`add-task-button ${themeStyle}`} onClick={onToggleAdd}>
              <span>
                <AiOutlinePlus />
                Add another list
              </span>
            </button>
          )}
        </section>

      )}
    </Droppable>
  )
}
