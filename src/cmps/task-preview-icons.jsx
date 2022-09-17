import React from 'react'
import { FiPaperclip } from 'react-icons/fi'
import { GrTextAlignFull } from 'react-icons/gr'

export const TaskPreviewIcons = ({ task }) => {
  return (
    <section className="details-icons">
      <section className="task-preview-icons">
        {task.description && <GrTextAlignFull />
        }
        {task.attachments && task.attachments.length !== 0 &&
          <section className="attachments-icon">
            <FiPaperclip />
            {task.attachments.length}
          </section>
        }
      </section>
    </section>
  )
}