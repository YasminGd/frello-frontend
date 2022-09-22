import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateBoard } from '../../store/actions/board.action'

export const TaskLabelsList = ({ labelIds }) => {
  const dispatch = useDispatch()
  const board = useSelector((state) => state.boardModule.board)
  const boardLabels = board.labels
  let isLabelsLarge = board.style.isLabelsLarge
  const labelsToRender = boardLabels.filter((label) => labelIds.includes(label.id))

  const toggleLabelsSize = (ev) => {
    ev.preventDefault()
    board.style.isLabelsLarge = !isLabelsLarge
    dispatch(updateBoard({ ...board }))
  }

  const labelsStyle = isLabelsLarge ? 'large' : ''
  return (
    <section className="task-labels-list">
      {labelsToRender.map((label) => (
        <div className="label-container" key={label.id}>
          <div
            onClick={toggleLabelsSize}
            className={`task-labels-preview ${isLabelsLarge ? label.class : label.color} ${labelsStyle}`}
            key={label.id}
          >
            {isLabelsLarge && (
              <React.Fragment>
                <div className={`color-circle ${label.color}`}></div>
                <span className="label-title">{label.title}</span>
              </React.Fragment>
            )}
          </div>
        </div>
      ))}
    </section>
  )
}
