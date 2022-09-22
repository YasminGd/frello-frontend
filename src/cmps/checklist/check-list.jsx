import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { addChecklist } from "../../store/actions/task.action"

export const CheckList = ({ setActionModal }) => {

    const [title, setTitle] = useState('Checklist')
    const params = useParams()
    const dispatch = useDispatch()

    const handleChange = ({ target }) => {
        const { value } = target
        setTitle(value)
    }

    const onAddChecklist = (ev) => {
        ev.preventDefault()
        dispatch(addChecklist(title, params.taskId, params.groupId))
        setActionModal(null)
    }

    return (<section className="check-list">
        <div className="input-container">
            <form onSubmit={onAddChecklist}>
                <label htmlFor="addTitle">Title</label>
                <input
                    autoFocus
                    id="addTitle"
                    type="text"
                    value={title}
                    onChange={handleChange}
                />
                <button className="blue btn">Add</button>
            </form>
        </div>
    </section >)
}