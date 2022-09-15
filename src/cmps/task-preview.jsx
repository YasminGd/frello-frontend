import { Link } from "react-router-dom";

export const TaskPreview = ({ task, groupId, removeItem }) => {
    return (<section className="task-preview">
        {/* <button onClick={() => removeItem(groupId, task.id)}>X</button> */}
        <Link to={`${groupId}/${task.id}`}>
            {task.title}
        </Link>
    </section>)
}