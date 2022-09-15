import { useState } from "react"

export const AddNew = ({ onToggleAdd, addItem, groupId }) => {
    const [title, setTitle] = useState('')

    const handleChange = ({ target }) => {
        setTitle(target.value)
    }

    const onAdd = (ev) => {
        ev.preventDefault()
        addItem(title, groupId)
    }

    return (
        <section className="add-new">
            <form onSubmit={onAdd}>
            <input type="text" placeholder="Enter a title for this card..." value={title} onChange={handleChange} />
            <button>Add card</button>
            <button onClick={onToggleAdd}>X</button>
            </form>
        </section>
    )
}