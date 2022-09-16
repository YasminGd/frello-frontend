import { Link } from "react-router-dom";

export const TaskPreview = ({ task, groupId, removeItem }) => {
    return (<Link to={`${groupId}/${task.id}`} className="task-preview">
        {task.title}
    </Link>
    )
}