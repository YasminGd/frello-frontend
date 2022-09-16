import { Link } from "react-router-dom";

export const TaskPreview = ({ task, groupId, removeItem }) => {
    const getCoverStyle = () => {
        if (task.style?.coverStyle) {
            if (task.style.coverStyle === 'fully covered') {
                return task.style.bgColor ? task.style.bgColor : ''
            }
        }
        return ''
    }

    console.log(getCoverStyle());
    return (<Link to={`${groupId}/${task.id}`} className="task-preview">
        {task.style?.bgColor && <section className="cover-color" style={{ backgroundColor: task.style.bgColor }}>
        </section>}
        <section className="task-body"
            style={{ backgroundColor: getCoverStyle() }}>
            {task.title}
        </section>
    </Link>)
}