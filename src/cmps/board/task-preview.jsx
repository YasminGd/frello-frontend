import { useState } from 'react'
import { BsPencil } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { QuickEdit } from './quick-edit'
import { TaskLabelsList } from '../labels/task-labels-list'
import { TaskPreviewIcons } from './task-preview-icons'
import { useRef } from 'react'
import { utilService } from '../../services/util.service'

export const TaskPreview = ({ task, groupId, provided, isDragging }) => {

  const taskPreviewRef = useRef()

  const [quickEdit, setQuickEdit] = useState(null)
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

  const toggleEditModal = (ev, ref) => {
    if (quickEdit) return setQuickEdit(null)
    ev.stopPropagation()
    ev.preventDefault()
    const pos = utilService.getModalPositionOnTop(ref)
    setQuickEdit({ pos })
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
      <section className='task-preview-conatainer' ref={taskPreviewRef}>
        {task.style?.coverImg && (
          <section className="cover-color img">
            <div className="image-gradient"></div>
            <img src={task.style.coverImg} />
          </section>
        )}

        {task.style?.bgColor &&
          (<section className="cover-color" style={{ backgroundColor: task.style.bgColor }}>
          </section>)
        }

        <section className={`task-body`} style={{ backgroundColor: getCoverStyle() }}>
          {isRenderLabels() && toRender && <TaskLabelsList labelIds={task.labelIds} />}
          <p>{task.title}</p>
          {toRender && <TaskPreviewIcons groupId={groupId} task={task} />}
        </section>

        <section className="quick-edit-icon" onClick={(ev) => { toggleEditModal(ev, taskPreviewRef) }}>
          <BsPencil />
        </section>

        {quickEdit && <QuickEdit
          pos={quickEdit.pos}
          task={task}
          groupId={groupId}
          setQuickEdit={setQuickEdit} />
        }
      </section>
    </Link>
  )
}
