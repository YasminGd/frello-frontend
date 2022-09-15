import { Link } from "react-router-dom";

export const TaskPreview = ({ task, groupId }) => {
    console.log(task);
    return <Link className="task-preview" to={`${groupId}/${task.id}`}>
        {task.title}
    </Link>
}