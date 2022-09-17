import { Link } from 'react-router-dom'
import { TaskPreviewIcons } from './task-preview-icons'

export const TaskPreview = ({ task, groupId, removeItem }) => {
  const getCoverStyle = () => {
    if (task.style?.coverStyle) {
      if (task.style.coverStyle === 'fully covered') {
        return task.style.bgColor ? task.style.bgColor : ''
      }
    }
    return ''
  }

  const getCoverImgOrColor = () => {
    if (task.style?.coverImg) {
      return { backgroundImage: `url("${task.style.coverImg}")` }
    }
    return { backgroundColor: task.style.bgColor }
  }

  return (
    <Link to={`${groupId}/${task.id}`} className="task-preview">
      {task.style?.coverImg && <section className="cover-color img">
        <img src={task.style.coverImg}/>
        {
          task.style.coverStyle === 'fully-covered' ? 
          <div>{task.title}</div> :
          ''
        }
      </section>}
      {task.style?.bgColor && <section className="cover-color" style={{ backgroundColor: task.style.bgColor }}></section>}
      <section className="task-body" style={{ backgroundColor: getCoverStyle() }}>
        {task.title}
        <TaskPreviewIcons task={task} />
      </section>
    </Link>
  )
}
