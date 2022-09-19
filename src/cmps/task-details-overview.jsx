import { TaskDatesOverview } from './task-dates-overview'
import { TaskLabelsOverview } from './task-labels-overview'

export const TaskDetailsOverview = ({ task, groupId, onOpenActionModal }) => {

  const isRenderLabels = () => {
    if (task.labelIds && task.labelIds.length && task.labelIds !== 0) return true
  }

  return (
    <section className="task-details-overview">
      <section className="members-labels-container">
        {isRenderLabels() && <TaskLabelsOverview onOpenActionModal={onOpenActionModal} labelIds={task.labelIds} />}
        {//*!! Here will go Members overview!!!*}
        }
      </section>
      {task.dueDate && <TaskDatesOverview task={task} groupId={groupId} onOpenActionModal={onOpenActionModal} />}
    </section>
  )
}
