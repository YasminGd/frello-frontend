import { BsSquareHalf } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { utilService } from '../services/util.service'
import { updateTask } from '../store/actions/task.action'

export const AttachmentPreview = ({ task, attachment, groupId }) => {
  const dispatch = useDispatch()

  const onDeleteAttachment = () => {
    if (task.style.coverImg === attachment.url) task.style.coverImg = null
    const { id } = attachment
    const attachmentTitle = attachment.url.split('/').pop()
    const taskToUpdate = {
      ...task,
      attachments: task.attachments.filter(
        (attachment) => attachment.id !== id
      ),
    }
    dispatch(updateTask(groupId, taskToUpdate, `deleted the Screenshot from ${attachmentTitle} attachment from ${task.title}`))
  }

  const onMakeCover = () => {
    if (task.style) {
      if (task.style.coverImg === attachment.url) {
        task.style.coverImg = null
        task.style.isFullyCovered = false
      }
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
      <section className="attachment-details">
        <section className="attachment-name-and-options">
          <span className="attachment-name">{attachment.name}</span>
          <span>Added {utilService.timeSince(attachment.createdAt)}</span>
          <span> - </span>
          <span onClick={onDeleteAttachment} className="delete-attachment">
            Delete
          </span>
        </section>
        <span className="attachment-options">
          <span onClick={onMakeCover} className="make-attachment-cover">
            <section className="svg-holder">
              <BsSquareHalf
                className="icon"
                style={{
                  transform: 'rotate(0.75turn) translateY(-20%) translateX(22%)',
                }}
              />
            {task.style?.coverImg === attachment.url ? 'Remove cover' : 'Make cover'}
            </section>
          </span>
        </span>
      </section>
    </section>
  )
}
