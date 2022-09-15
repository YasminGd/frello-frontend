import { useEffect } from "react"
import { useRef, useState } from "react"

export const AddNew = ({ onToggleAdd, addItem, groupId }) => {
    const [title, setTitle] = useState('')

    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()
    })

    const handleChange = ({ target }) => {
        setTitle(target.value)
    }

    const onAdd = (ev) => {
        ev.preventDefault()
        if (!title) return
        //send this as an object?
        addItem(title, groupId)
        setTitle('')
        onToggleAdd()
    }

    return (
        <section className="add-new">
            <form onSubmit={onAdd}>
                <input type="text" placeholder="Enter a title for this card..." value={title} onChange={handleChange} ref={inputRef}/>
                <button>Add card</button>
                <button onClick={onToggleAdd}>X</button>
            </form>
        </section>
    )
}