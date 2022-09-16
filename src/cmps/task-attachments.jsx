import { GrAttachment } from 'react-icons/gr'
import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { updateTask } from '../store/actions/task.action'

export const TaskAttachments = ({ task, groupId }) => {
  const dispatch = useDispatch()

  const { attachments } = task

  return (
    <section className="task-attachments">
      <div className="attachments-header">
        <h3>Attachments</h3>
        <GrAttachment />
      </div>
      <div className="attachments-body">{attachments && <h1>THERE ARE ATTACHMENTS</h1>}</div>
    </section>
  )
}
