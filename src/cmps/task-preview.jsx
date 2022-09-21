import { useState } from 'react'
import { BsPencil } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { QuickEdit } from './quick-edit'
import { TaskLabelsList } from './task-labels-list'
import { TaskPreviewIcons } from './task-preview-icons'

export const TaskPreview = ({ task, groupId, provided, isDragging }) => {
  // const [isQuickEditOpen, setIsQuickEditOpen] = useState(false)
  const getCoverStyle = () => {
    if (task.style?.isFullyCovered && task.style.isFullyCovered) {
      return task.style.bgColor ? task.style.bgColor : ''
    }
    return ''
  }

  const renderOptions = () => {
    return !task.style || (task.style && !task.style.isFullyCovered)
  }

  const isRenderLabels = () => {
    if (task.labelIds && task.labelIds.length && task.labelIds !== 0) return true
  }

  // const toggleEditModal = (ev) => {
  //   ev.stopPropagation()
  //   ev.preventDefault()
  //   setIsQuickEditOpen(!isQuickEditOpen)
  // }

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
      {task.style?.coverImg && (
        <section className="cover-color img">
          <div className="image-gradient"></div>
          <img src={task.style.coverImg} />
        </section>
      )}
      {task.style?.bgColor && (
        <section className="cover-color" style={{ backgroundColor: task.style.bgColor }}></section>
      )}
      <section className={`task-body`} style={{ backgroundColor: getCoverStyle() }}>
        {isRenderLabels() && <TaskLabelsList labelIds={task.labelIds} />}
        {task.title}
        {toRender && <TaskPreviewIcons groupId={groupId} task={task} />}
      </section>
      {/* <section className="quick-edit-icon" onClick={toggleEditModal}>
        <BsPencil />
      </section> */}
      {/* {
        isQuickEditOpen && <QuickEdit />
      } */}
    </Link>
  )
}
