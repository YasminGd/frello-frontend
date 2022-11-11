import { GrTextAlignFull } from 'react-icons/gr'
import { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateTask } from '../../store/actions/task.action'

export const TaskDescription = ({ task, groupId }) => {
  const dispatch = useDispatch()
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false)
  const [descriptionTxt, setDescriptionTxt] = useState()
  const [textareaHeight, setTextareaHeight] = useState({ height: '56px' })
  const initialDescription = useRef(task.description)

  useEffect(() => {
    setDescriptionTxt(task.description || '')
  }, [task])

  const handleChange = ({ target }) => {
    const { value } = target
    setDescriptionTxt(value)
  }

  const setTaskDesc = (isCancel) => {
    task.description = descriptionTxt

    if (isCancel) {
      task.description = initialDescription.current
      setDescriptionTxt(task.description)
    }

    dispatch(updateTask(groupId, task))
  }

  // TODO: IMPORTANT! Check why there are two handleChanges
  const handleDescChange = (ev, isCancel) => {
    setTimeout(() => {
      setIsDescriptionFocused(false)
      setTextareaHeight({ height: '56px' })
    }, 150)
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
          style={{ ...bgStyle, ...textareaHeight }}
          placeholder="Add a more detailed description..."
          onFocus={() => {
            setTextareaHeight({ height: '108px' })
            setIsDescriptionFocused(true)
          }}
          onBlur={handleDescChange}
          onChange={handleChange}
          value={descriptionTxt}
        ></textarea>
        {isDescriptionFocused && (
          <div className="btns-container">
            <button className="btn-save">Save</button>
            <button
              onClick={(ev) => handleDescChange(ev, true)}
              className="btn-cancel"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
