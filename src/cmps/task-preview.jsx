import { Link } from 'react-router-dom'
import { TaskLabelsList } from './task-labels-list'
import { TaskPreviewIcons } from './task-preview-icons'

export const TaskPreview = ({ task, groupId, provided, isDragging }) => {
  const getCoverStyle = () => {
    if (task.style?.coverStyle && task.style.coverStyle === 'fully covered') {
      return task.style.bgColor ? task.style.bgColor : ''
    }
    return ''
  }

  const renderOptions = () => {
    return !task.style || (task.style && task.style.coverStyle !== 'fully covered')
  }

  const isRenderLabels = () => {
    if (task.labelIds && task.labelIds.length && task.labelIds !== 0) return true
  }

  const toRender = renderOptions()
  return (
    <Link
      to={`${groupId}/${task.id}`}
      className={`task-preview ${isDragging ? 'dragging' : ''}`}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
    >
      {task.style?.coverImg && (
        <section className="cover-color img">
          <img src={task.style.coverImg} />
        </section>
      )}
      {task.style?.bgColor && (
        <section className="cover-color" style={{ backgroundColor: task.style.bgColor }}></section>
      )}
      <section className="task-body" style={{ backgroundColor: getCoverStyle() }}>
        {isRenderLabels() && <TaskLabelsList labelIds={task.labelIds} />}
        {task.title}
        {toRender && <TaskPreviewIcons groupId={groupId} task={task} />}
      </section>
    </Link>
  )
}
