import { GrTextAlignFull } from 'react-icons/gr'
import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { updateTask } from '../../store/actions/task.action'

export const TaskDescription = ({ task, groupId }) => {
  task = structuredClone(task)
  const dispatch = useDispatch()
  const [isBtnsDesc, setIsBtnsDesc] = useState(false)
  const [descTxt, setDescTxt] = useState(task.description)
  const [modalHeight, setModalHeight] = useState({ height: '56px' })
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
    setTimeout(() => {
      setIsBtnsDesc(false)
      setModalHeight({ height: '56px' })
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
          style={{ ...bgStyle, ...modalHeight }}
          placeholder="Add a more detailed description..."
          onFocus={() => {
            setModalHeight({ height: '108px' })
            setIsBtnsDesc(true)
          }}
          onBlur={handleDescChange}
          onChange={handleChange}
          value={descTxt}
        ></textarea>
        {isBtnsDesc && (
          <div className="btns-container">
            <button className="btn-save">Save</button>
            <button onClick={(ev) => handleDescChange(ev, true)} className="btn-cancel">
              Cancel
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
