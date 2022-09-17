import { Link } from 'react-router-dom'
import { TaskPreviewIcons } from './task-preview-icons'

export const TaskPreview = ({ task, groupId, removeItem, provided }) => {
  const getCoverStyle = () => {
    if (task.style?.coverStyle) {
      if (task.style.coverStyle === 'fully covered') {
        return task.style.bgColor ? task.style.bgColor : ''
      }
    }
    return ''
  }

  const renderOptions = () => {
    return (!task.style || (task.style && task.style.coverStyle !== 'fully covered'))
  }


  const toRender = renderOptions()
  return (
    <Link
      to={`${groupId}/${task.id}`}
      className="task-preview"
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
    >
      {task.style?.coverImg && <section className="cover-color img">
        <img src={task.style.coverImg} />
      </section>}
      {task.style?.bgColor && <section className="cover-color" style={{ backgroundColor: task.style.bgColor }}></section>}
      <section className="task-body" style={{ backgroundColor: getCoverStyle() }}>
        {task.title}
        { toRender && <TaskPreviewIcons task={task} />}
      </section>
    </Link>
  )
}
