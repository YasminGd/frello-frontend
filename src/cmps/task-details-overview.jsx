import { TaskDatesOverview } from './task-dates-overview'
import { TaskLabelsOverview } from './task-labels-overview'
import { TaskMembersOverview } from './task-members-overview'

export const TaskDetailsOverview = ({ task, groupId, onOpenActionModal }) => {
  const isRenderLabels = () => {
    if (task.labelIds && task.labelIds.length && task.labelIds !== 0) return true
  }

  const isRenderMembers = () => {
    if (task.memberIds && task.memberIds.length && task.memberIds !== 0) return true
  }

  return (
    <section className="task-details-overview">
      <section className="members-labels-container">
        {isRenderMembers() && <TaskMembersOverview onOpenActionModal={onOpenActionModal} memberIds={task.memberIds} />}
        {isRenderLabels() && <TaskLabelsOverview onOpenActionModal={onOpenActionModal} labelIds={task.labelIds} />}
      </section>
      {task.dueDate && <TaskDatesOverview task={task} groupId={groupId} onOpenActionModal={onOpenActionModal} />}
    </section>
  )
}
