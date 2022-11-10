import { useState } from "react"
import { useDispatch } from "react-redux"
import { locationService } from "../../services/location.service"
import { updateTask } from "../../store/actions/task.action"
import { LocationList } from "./location-list"

// TODO check why the api calls doesn't work
export const Location = ({ task, groupId, setActionModal }) => {
    const [search, setSearch] = useState('')
    const [locations, setLocations] = useState(null)

    const dispatch = useDispatch()

    const handleChange = ({ target }) => {
        setSearch(target.value)
    }

    const onSearch = async (ev) => {
        ev.preventDefault()
        const locations = await locationService.searchLocation(search)
        setLocations(locations)
    }

    const setLocation = (location) => {
        task.location = location
        dispatch(updateTask(groupId, task))
        setActionModal(null)
    }

    return <section className="location">
        <form onSubmit={onSearch}>
            <input
                className="input"
                placeholder="Search Google Maps"
                value={search}
                autoFocus={window.innerWidth >= 1200}
                onChange={handleChange} />
        </form>
        {
            locations && <LocationList locations={locations} setLocation={setLocation} />
        }
    </section>
}