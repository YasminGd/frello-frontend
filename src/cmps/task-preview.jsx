import { Link } from "react-router-dom";

export const TaskPreview = ({ task, groupId }) => {
    return <Link className="task-preview" to={`${groupId}/${task.id}`}>
        {task.title}
    </Link>
}