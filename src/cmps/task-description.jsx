import { GrTextAlignFull } from 'react-icons/gr'
import { useState } from "react"

export const TaskDescription = ({ task }) => {

    const [isBtnsDesc, setIsBtnsDesc] = useState(false)
    const [titleTxt, setTitleTxt] = useState(task.title)

    const handleChange = ({ target }) => {
        const { value } = target
        setTitleTxt(value)
    }

    return (
        <section className="task-description">
            <div className="description-header">
                <h3>Description</h3>
                <GrTextAlignFull />
            </div>
            <div className="description-body">
                <textarea
                    placeholder="Add a more detailed description..."
                    onFocus={() => { setIsBtnsDesc(true) }}
                    onBlur={() => { setIsBtnsDesc(false) }}
                >
                </textarea>
                {isBtnsDesc && <div className="btns-container">
                    <button className="btn-save">Save</button>
                    <button className="btn-cancel">Cancel</button>
                </div>}
            </div>
        </section>
    )
}