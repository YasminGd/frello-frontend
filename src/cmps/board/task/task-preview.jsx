import { BsPencil } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { TaskLabelsList } from '../../labels/task-labels-list'
import { TaskPreviewIcons } from './task-preview-icons'
import { useRef } from 'react'
import { utilService } from 'services/util.service'

export const TaskPreview = ({
  task,
  groupId,
  provided,
  isDragging,
  quickEdit,
  setQuickEdit,
}) => {
  const taskPreviewRef = useRef()

  const getCoverStyle = () => {
    if (task.style?.isFullyCovered) {
      return task.style.bgColor ? task.style.bgColor : ''
    }
    return ''
  }

  const renderOptions = () => {
    // Return true only if there is style AND task style isn't fully covered
    return task.style && !task.style.isFullyCovered
  }

  const isRenderLabels = () => {
    if (task.labelIds && task.labelIds.length && task.labelIds !== 0)
      return true
  }

  const toggleEditModal = (ev, ref) => {
    if (quickEdit) return setQuickEdit(null)
    ev.stopPropagation()
    ev.preventDefault()
    const pos = utilService.getModalPositionOnTop(ref)
    setQuickEdit({ pos, task, groupId })
  }

  const toRender = renderOptions()

  return (
    <Link
      to={`${groupId}/${task.id}`}
      className={`task-preview ${isDragging ? 'dragging' : ''} 
      ${task?.style?.isFullyCovered ? 'full' : ''}`}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
    >
      <section className="task-preview-container" ref={taskPreviewRef}>
        {task.style?.coverImg && (
          <section className="cover-color img">
            <div className="image-gradient">
              {!toRender && <p>{task.title}</p>}
            </div>
            <img src={task.style.coverImg} alt="cover" />
          </section>
        )}

        {task.style?.bgColor && (
          <section
            className="cover-color"
            style={{ backgroundColor: task.style.bgColor }}
          >
            {!toRender && <p>{task.title}</p>}
          </section>
        )}

        {toRender && (
          <section
            className={`task-body`}
            style={{ backgroundColor: getCoverStyle() }}
          >
            {isRenderLabels() && <TaskLabelsList labelIds={task.labelIds} />}
            <p>{task.title}</p>
            <TaskPreviewIcons groupId={groupId} task={task} />
          </section>
        )}

        <section
          className="quick-edit-icon"
          onClick={(ev) => {
            toggleEditModal(ev, taskPreviewRef)
          }}
        >
          <BsPencil />
        </section>
      </section>
    </Link>
  )
}
