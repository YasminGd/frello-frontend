import { useEffect } from "react"
import { useState } from "react"
import { useRef } from "react"
import { BiSearch } from "react-icons/bi"
import { useDispatch } from "react-redux"
import { locationService } from "../../services/location.service"
import { updateTask } from "../../store/actions/task.action"
import { LocationList } from "./location-list"

export const Location = ({ task, groupId, setActionModal }) => {
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
                ref={inputRef}
                value={search}
                onChange={handleChange} />
        </form>
        {
            locations && <LocationList locations={locations} setLocation={setLocation} />
        }
    </section>
}