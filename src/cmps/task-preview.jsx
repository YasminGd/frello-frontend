import { Link } from "react-router-dom";

export const TaskPreview = ({task}) => {
    console.log(task);
    return <Link className="task-preview" to={`task/${task.id}`}>
        {task.title}
    </Link>
}