import { Link } from "react-router-dom";

export const TaskPreview = ({ task, groupId, removeItem }) => {
    return (<Link to={`${groupId}/${task.id}`} className="task-preview">
        {task.style?.bgColor && <section className="cover-color" style={{ backgroundColor: task.style.bgColor }}>
        </section>}
        <section className="task-body">
            {task.title}
        </section>
    </Link>)
}