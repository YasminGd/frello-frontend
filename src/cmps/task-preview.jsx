export const TaskPreview = ({task}) => {
    console.log(task);
    return <section className="task-preview">
        {task.title}
    </section>
}