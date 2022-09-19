import React from 'react'
import { FiPaperclip } from 'react-icons/fi'
import { GrTextAlignFull } from 'react-icons/gr'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { BiCheckbox } from 'react-icons/bi'
import { utilService } from '../services/util.service'
import { BsCheck2Square } from 'react-icons/bs'

export const TaskPreviewIcons = ({ task }) => {
  const todosPreview = () => {
    if (!task.checklists || task?.checklists.length === 0) return

    let todos
    let doneTodos
    if (task.checklists.length === 1) {
      todos = task.checklists[0].todos.length
      doneTodos = task.checklists[0].todos.filter(todo => todo.isDone).length
    } else {
      todos = task.checklists.reduce((currChecklist, prevChecklist) => currChecklist.todos.length + prevChecklist.todos.length)
      doneTodos = task.checklists.reduce((currChecklist, prevChecklist) => currChecklist.todos.filter(todo => todo.isDone).length + prevChecklist.todos.filter(todo => todo.isDone).length)
    }
    console.log(todos);
    return { doneTodos, todos }
  }

  const todoDetails = todosPreview()
  console.log(todoDetails);

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
        {task.checklists && task.checklists.length !== 0 && (todoDetails.doneTodos !== 0 || todoDetails.todos !== 0) && (
          <section className={`attachments-icon ${todoDetails.doneTodos === todoDetails.todos ? 'done' : ''}`}>
            <BsCheck2Square />
            {`${todoDetails.doneTodos}/${todoDetails.todos}`}
          </section>
        )}
      </section>
    </section>
  )
}
