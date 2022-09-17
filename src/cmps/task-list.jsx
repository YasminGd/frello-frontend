import { Draggable, Droppable } from 'react-beautiful-dnd'
import { TaskPreview } from './task-preview.jsx'

export const TaskList = ({ tasks, groupId, removeItem }) => {
    return (
        <Droppable droppableId={groupId} type="task">
            {(provided) => (
                <section className="task-list"
                    {...provided.droppableProps}
                    ref={provided.innerRef}>
                    {tasks.map((task, index) => (
                        <Draggable draggableId={task.id} key={task.id} index={index}>
                            {(provided) => (
                                <TaskPreview
                                    provided={provided}
                                    key={task.id}
                                    task={task}
                                    groupId={groupId}
                                    removeItem={removeItem}
                                />
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </section>
            )}
        </Droppable>
    )
}