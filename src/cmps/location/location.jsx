import { useEffect } from "react"
import { useState } from "react"
import { useRef } from "react"
import { BiSearch } from "react-icons/bi"
import { useDispatch } from "react-redux"
import { locationService } from "../../services/location.service"
import { updateTask } from "../../store/actions/task.action"
import { LocationList } from "./location-list"

export const Location = ({ task, groupId }) => {
    const [search, setSearch] = useState('')
    const [locations, setLocations] = useState(null)

    const inputRef = useRef()
    const dispatch = useDispatch()

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    const handleChange = ({ target }) => {
        setSearch(target.value)
    }

    const onSearch = async (ev) => {
        ev.preventDefault()
        const locations = await locationService.searchLocation(search)
        console.log(locations);
        setLocations(locations)
    }

    const setLocation = (location) => {
        console.log(location);
        task.location = location
        console.log(task);
        dispatch(updateTask(groupId, task))
    }

    return <section className="location">
        <form onSubmit={onSearch}>
            <input
                className="input"
                placeholder="Search Google Maps"
                ref={inputRef}
                value={search}
                onChange={handleChange} />
        </form>
        {
            locations && <LocationList locations={locations} setLocation={setLocation} />
        }
    </section>
}