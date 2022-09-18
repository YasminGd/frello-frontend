import { useSelector } from "react-redux"

export const TaskLabelsList = ({ labelIds }) => {
    const boardLabels = useSelector(state => state.boardModule.board.labels)
    const labelsToRender = boardLabels.filter(label => labelIds.includes(label.id))

    return (
        <section className="task-labels-list">
            {labelsToRender.map(label => (
                <div className={`task-labels-preview ${label.class}`}>
                </div>
            ))}
        </section>
    )
}