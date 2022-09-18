import React from 'react'
import { FiPaperclip } from 'react-icons/fi'
import { GrTextAlignFull } from 'react-icons/gr'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { BiCheckbox } from 'react-icons/bi'
import { utilService } from '../services/util.service'

export const TaskPreviewIcons = ({ task }) => {
  return (
    <section className="details-icons">
      <section className="task-preview-icons">
        {task.dueDate && (
          <section className="date-container">
            <AiOutlineClockCircle />
            <span>{utilService.dueDateFormat(task.dueDate.date)}</span>
          </section>
        )}
        {task.description && (
          <section className="attachments-icon">
            <GrTextAlignFull />
          </section>
        )}
        {task.attachments && task.attachments.length !== 0 && (
          <section className="attachments-icon">
            <FiPaperclip />
            {task.attachments.length}
          </section>
        )}
      </section>
    </section>
  )
}
