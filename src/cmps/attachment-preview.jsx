import { useDispatch } from 'react-redux'
import { utilService } from '../services/util.service'
import { updateTask } from '../store/actions/task.action'

export const AttachmentPreview = ({ task, attachment, groupId }) => {
  const dispatch = useDispatch()

  const onDeleteAttachment = () => {
    const { id } = attachment
    const taskToUpdate = {
      ...task,
      attachments: task.attachments.filter(
        (attachment) => attachment.id !== id
      ),
    }
    dispatch(updateTask(groupId, taskToUpdate))
  }

  const onMakeCover = () => {
    if (task.style) {
      if (task.style.coverImg === attachment.url) task.style.coverImg = null
      else {
        task.style.coverImg = attachment.url
        task.style.bgColor = null
      }
    }
    else task.style = { coverImg: attachment.url }
    dispatch(updateTask(groupId, task))
  }

  return (
    <section className="attachment-preview">
      <a
        className="attachment-preview-img"
        style={{ backgroundImage: `url(${attachment.url})` }}
        href={attachment.url}
        target={'_blank'}
      ></a>
      <p className="attachment-details">
        <span className="attachment-name">{attachment.name}</span>
        <span className="attachment-options">
          <span>Added {utilService.timeSince(attachment.createdAt)}</span>
          <span> - </span>
          <span onClick={onDeleteAttachment} className="delete-attachment">
            Delete
          </span>
          <span> - </span>
          <span onClick={onMakeCover} className="delete-attachment">
            {task.style?.coverImg === attachment.url ? 'Remove cover': 'Make cover'}
          </span>
        </span>
      </p>
    </section>
  )
}
