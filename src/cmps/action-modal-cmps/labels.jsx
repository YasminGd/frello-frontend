import { GrFormEdit } from 'react-icons/gr'
import { useSelector, useDispatch } from 'react-redux'
import { updateTask } from '../../store/actions/task.action'
import React, { useState } from 'react'
import { EditLabel } from './edit-label'

export const Labels = ({ task, groupId, onToggleLabelEdit, isLabelsEdit }) => {

    const dispatch = useDispatch()
    let boardLabels = useSelector(state => state.boardModule.board.labels)
    const [labelsToRender, setLabelsToRender] = useState(boardLabels)
    const [selectedLabel, setSelectedLabel] = useState()

    const handleChange = ({ target }, labelId) => {
        if (target.type === 'checkbox') {
            if (!task.labelIds) task.labelIds = []
            if (target.checked) task.labelIds.push(labelId)

            else if (!target.checked) {
                const labelIdx = task.labelIds.findIndex(currLabelId => currLabelId === labelId)
                task.labelIds.splice(labelIdx, 1)
            }
            dispatch(updateTask(groupId, task))

        } else if (target.type === 'text') {
            const regex = new RegExp(target.value, 'i')
            const filteredLabels = boardLabels.filter(label => regex.test(label.title))
            setLabelsToRender(filteredLabels)
        }
    }

    const onEditLabel = (label) => {
        setSelectedLabel(label)
        onToggleLabelEdit()
    }

    return (
        <section className="labels">
            {isLabelsEdit ? <EditLabel label={selectedLabel} onToggleLabelEdit={onToggleLabelEdit} /> :
                <React.Fragment>
                    <div className="">
                        <input onChange={handleChange}
                            autoFocus
                            className="search-label"
                            type="text"
                            placeholder="Search labels…" />
                    </div>
                    <p className="sub-header">Labels</p>
                    <ul>
                        {labelsToRender.map(label => (
                            <li key={label.id}>
                                <label htmlFor={label.id}>
                                    <input onChange={(ev) => { handleChange(ev, label.id) }}
                                        checked={task.labelIds?.includes(label.id)}
                                        className="checkbox"
                                        type="checkbox"
                                        id={label.id} />
                                    <div className="label-container">
                                        <div className={`label-color ${label.class}`}>
                                            <div className="label-color-circle" style={{ backgroundColor: label.color }}></div>
                                            {label.title && <span className="label-title">{label.title}</span>}
                                        </div>
                                    </div>
                                </label>
                                <button onClick={() => { onEditLabel(label) }} className="color"><GrFormEdit /></button>
                            </li>
                        ))}
                    </ul>
                    <button className="create">Create new label</button>
                </React.Fragment>
            }
        </section >
    )
}
