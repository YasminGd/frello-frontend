import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"
import { IoLocationSharp } from "react-icons/io5"
import { useDispatch } from "react-redux"
import { updateTask } from "../../store/actions/task.action"
import { Map } from "./map"

export const TaskLocation = ({ task, groupId, onOpenActionModal }) => {
  task = structuredClone(task)
  const [name, setName] = useState(task.location.name)
  const dispatch = useDispatch()
  const btnCloseRef = useRef()

  useEffect(() => {
    setName(task.location.name)
  }, [task.location.address])

  const handleChange = ({ target }) => {
    setName(target.value)
  }

  const onChangeName = () => {
    task.location.name = name
    dispatch(updateTask(groupId, task))
  }

  return (
    <section className='task-location'>
      <div className='location-header'>
        <IoLocationSharp />
        <h3>Location</h3>
      </div>
      <section className='map-container'>
        <Map location={task.location.location} />
        <section className='map-details'>
          <section className='left'>
            <input value={name} onChange={handleChange} onBlur={onChangeName} />
            <p>{task.location.address}</p>
          </section>
          <section className='right'>
            <button
              ref={btnCloseRef}
              onClick={() =>
                onOpenActionModal("Location preview actions", btnCloseRef)
              }
            >
              …
            </button>
          </section>
        </section>
      </section>
    </section>
  )
}
