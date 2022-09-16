import { GrTextAlignFull } from 'react-icons/gr'
import { useState, useRef } from "react"
import { useDispatch } from 'react-redux'
import { updateTask } from '../store/actions/task.action'

export const TaskDescription = ({ task, groupId }) => {

    const dispatch = useDispatch()
    const [isBtnsDesc, setIsBtnsDesc] = useState(false)
    const [descTxt, setDescTxt] = useState(task.description)
    const initialDesc = useRef(task.description)

    const handleChange = ({ target }) => {
        const { value } = target
        setDescTxt(value)
    }

    const setTaskDesc = (isCancel) => {
        task.description = descTxt

        if (isCancel) {
            task.description = initialDesc['current']
            setDescTxt(task.description)
        }

        dispatch(updateTask(groupId, task))
    }

    const handleDescChange = (ev, isCancel) => {
        setTimeout(() => setIsBtnsDesc(false), 200)
        setTaskDesc(isCancel)
    }

    const bgStyle = task.description ? { backgroundColor: 'transparent' } : {}

    return (
        <section className="task-description">
            <div className="description-header">
                <h3>Description</h3>
                <GrTextAlignFull />
            </div>
            <div className="description-body">
                <textarea
                    style={bgStyle}
                    placeholder="Add a more detailed description..."
                    onFocus={() => { setIsBtnsDesc(true) }}
                    onBlurCapture={handleDescChange}
                    onChange={handleChange}
                    value={descTxt}>
                </textarea>
                {isBtnsDesc && <div className="btns-container">
                    <button onClick={setTaskDesc} className="btn-save">Save</button>
                    <button onClick={(ev) => handleDescChange(ev, true)}
                        className="btn-cancel">Cancel</button>
                </div>}
            </div>
        </section >
    )
}