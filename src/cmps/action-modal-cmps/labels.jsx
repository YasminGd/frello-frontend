import { GrFormEdit } from 'react-icons/gr'
import { useSelector, useDispatch } from 'react-redux'
import { updateTask } from '../../store/actions/task.action'
import React from 'react'
import { EditLabel } from './edit-label'

export const Labels = ({ task, groupId, onToggleLabelEdit, isLabelsEdit }) => {

    const dispatch = useDispatch()
    const boardLabels = useSelector(state => state.boardModule.board.labels)

    const handleChange = ({ target }, labelId) => {
        if (target.type === 'checkbox') {
            if (!task.labelIds) task.labelIds = []
            if (target.checked) task.labelIds.push(labelId)

            else if (!target.checked) {
                const labelIdx = task.labelIds.findIndex(currLabelId => currLabelId === labelId)
                task.labelIds.splice(labelIdx, 1)
            }
            dispatch(updateTask(groupId, task))
        }
    }

    return (
        <section className="labels">
            {isLabelsEdit ? <EditLabel onToggleLabelEdit={onToggleLabelEdit} /> :
                <React.Fragment>
                    <div className="">
                        <input onChange={handleChange} autoFocus className="search-label" type="text" placeholder="Search labels…" value="" />
                    </div>
                    <p className="sub-header">Labels</p>
                    <ul>
                        {boardLabels.map(label => (
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
                                <button onClick={onToggleLabelEdit} className="color"><GrFormEdit /></button>
                            </li>
                        ))}
                    </ul>
                    <button className="create">Create new label</button>
                </React.Fragment>
            }
        </section >
    )
}
