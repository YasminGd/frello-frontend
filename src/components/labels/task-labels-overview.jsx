import React, { useRef } from "react"
import { AiOutlinePlus } from "react-icons/ai"
import { useSelector } from "react-redux"


export const TaskLabelsOverview = ({ labelIds, onOpenActionModal }) => {
    const btnAddLabelRef = useRef()
    const labelsContainerRef = useRef()
    const boardLabels = useSelector(state => state.boardModule.board.labels)

    const labelsToRender = boardLabels.filter(label => labelIds.includes(label.id))

    return (
        <section className="task-labels-overview">
            <h4 className="title">Labels</h4>
            <div className="labels-container" ref={labelsContainerRef}>
                {labelsToRender.map(label => (
                    <button
                        onClick={() => { onOpenActionModal('Labels', labelsContainerRef) }}
                        key={label.id}
                        className={`btn-label ${label.class}`}>
                        <div className={`color-circle ${label.color}`}></div>
                        <span>{label.title}</span>
                    </button>
                ))}
                <button
                    onClick={() => { onOpenActionModal('Labels', btnAddLabelRef) }}
                    ref={btnAddLabelRef}
                    className="btn-add-label">
                    <AiOutlinePlus />
                </button>
            </div>
        </section >
    )
}