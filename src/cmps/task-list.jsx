import { TaskPreview } from './task-preview.jsx'

export const TaskList = ({ tasks }) => {
    console.log(tasks)
    return <section className="task-list">
        {
            tasks.map(task => <TaskPreview task={task} />)
        }
    </section>
}