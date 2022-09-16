import { TaskPreview } from './task-preview.jsx'

export const TaskList = ({ tasks, groupId,removeItem }) => {
    return <section className="task-list">
        {
            tasks.map(task => <TaskPreview key={task.id} task={task} groupId={groupId} removeItem={removeItem} />)
        }
    </section>
}