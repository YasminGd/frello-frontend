import { useDispatch } from "react-redux"
import { updateTask } from '../../store/actions/task.action'

export const LocationActions = ({ groupId, task, setActionModal }) => {
    task = structuredClone(task)
    const dispatch = useDispatch()

    const onRemoveLocation = () => {
        task.location = null
        dispatch(updateTask(groupId, task))
        setActionModal(null)
    }

    return (
        <section className="location-actions">
            <button className="btn" onClick={onRemoveLocation}>Remove</button>
        </section>
    )
}