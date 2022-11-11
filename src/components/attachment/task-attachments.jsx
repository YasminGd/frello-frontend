import { GrAttachment } from 'react-icons/gr'
import { AttachmentPreview } from './attachment-preview'

export const TaskAttachments = ({ task, groupId }) => {
  const { attachments } = task

  return (
    <section className="task-attachments">
      <div className="attachments-header">
        <h3>Attachments</h3>
        <GrAttachment />
      </div>

      <div className="attachments-body">
        {attachments &&
          attachments.map((attachment) => (
            <AttachmentPreview key={attachment.id} task={task} attachment={attachment} groupId={groupId} />
          ))}
      </div>
    </section>
  )
}
