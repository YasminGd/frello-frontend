import { TaskPreview } from './task-preview.jsx'

export const TaskList = ({ tasks, groupId }) => {
    console.log(tasks)
    return <section className="task-list">
        {
            tasks.map(task => <TaskPreview task={task} groupId={groupId} />)
        }
    </section>
}