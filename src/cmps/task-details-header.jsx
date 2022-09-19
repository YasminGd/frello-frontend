import { useState } from "react"
import { GrCreditCard } from "react-icons/gr"
import { useDispatch } from "react-redux"
import { updateTask } from "../store/actions/task.action"


export const TaskDetailsHeader = ({ task, groupId, groupTitle }) => {

    const [titleTxt, setTitleTxt] = useState(task.title)
    const dispatch = useDispatch()

    const handleChange = ({ target }) => {
        const { value } = target
        setTitleTxt(value)
    }

    const handleUserKeyPress = (ev) => {
        if (ev.key === 'Enter' && !ev.shiftKey) ev.target.blur()
    }

    const setTaskTitle = () => {
        task.title = titleTxt
        dispatch(updateTask(groupId, { ...task }))
    }

    return (
        <section className="task-header">
            <textarea name=""
                value={titleTxt}
                onChange={handleChange}
                onKeyPress={handleUserKeyPress}
                onBlur={setTaskTitle} />
            <div className="sub-title">in list &nbsp;
                <span className="group-title">{groupTitle}</span>
            </div>
            <GrCreditCard className="header-icon" />
        </section>
    )
}   