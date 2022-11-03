import { Draggable, Droppable } from 'react-beautiful-dnd'
import { AddItem } from '../../global/add-item.jsx'
import { TaskPreview } from './task-preview.jsx'

export const TaskList = ({ tasks, groupId, removeItem, addItem, isAddOpen, onToggleAdd, placeholderProps, quickEdit, setQuickEdit }) => {
  return (
    <Droppable droppableId={groupId} type="task">
      {(provided, snapshot) => (
        <section
          className={`task-list ${isAddOpen ? 'full' : ''}`}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {tasks.map((task, index) => (
            <Draggable draggableId={task.id} key={task.id} index={index}>
              {(provided, snapshot) => (
                <TaskPreview
                  provided={provided}
                  key={task.id}
                  task={task}
                  groupId={groupId}
                  removeItem={removeItem}
                  isDragging={snapshot.isDragging}
                  quickEdit={quickEdit}
                  setQuickEdit={setQuickEdit}
                />
              )}
            </Draggable>
          ))}
          {provided.placeholder}
          {/* {!isEmpty(placeholderProps) && snapshot.isDraggingOver && (
            <div
              className="placeholder"
              style={{
                position: 'absolute',
                top: placeholderProps.clientY,
                left: placeholderProps.clientX,
                height: placeholderProps.clientHeight,
                width: placeholderProps.clientWidth,
                backgroundColor: '#000',
                // backgroundColor: '#E3E4E9',
                borderRadius: '3px',
              }}
            />
          )} */}
          {isAddOpen && <AddItem addItem={addItem} onToggleAdd={onToggleAdd} groupId={groupId} />}
        </section>
      )}
    </Droppable>
  )
}
