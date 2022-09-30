import { useEffect } from "react"
import { useRef, useState } from "react"
import { GrClose } from 'react-icons/gr'

export const AddItem = ({ onToggleAdd, addItem, groupId }) => {
    const [title, setTitle] = useState('')

    const handleChange = ({ target }) => {
        setTitle(target.value)
    }

    const onAdd = (ev) => {
        if (ev) ev.preventDefault()
        if (!title) return
        addItem(title, groupId)
        setTitle('')
        onToggleAdd()
    }

    const handleUserKeyPress = (ev) => {
        if (ev.key === "Enter" && !ev.shiftKey) {
            onAdd()
        }
    }

    return (
        <section className="add-item">
            <form onSubmit={onAdd}>
                <textarea
                    type="text"
                    placeholder="Enter a title for this card..."
                    value={title}
                    onChange={handleChange}
                    autoFocus={window.innerWidth >= 1200}
                    onKeyPress={handleUserKeyPress} />
                <button>Add card</button>
                <section className="svg-holder">
                    <GrClose onClick={onToggleAdd} />
                </section>
            </form>
        </section>
    )
}