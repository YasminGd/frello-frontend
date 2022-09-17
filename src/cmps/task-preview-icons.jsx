import { FiPaperclip } from 'react-icons/fi'

export const TaskPreviewIcons = ({task}) => {
    return (
        <section className="details-icons">
          {task.attachments && task.attachments.length !== 0 && <section className="task-preview-icons">
            <FiPaperclip />
            {task.attachments.length}
          </section>}
        </section>
    )
}