import { useEffect } from "react"
import { useRef, useState } from "react"
import { GrClose } from 'react-icons/gr'

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
        <section className="add-new">
            <form onSubmit={onAdd}>
                <textarea
                    type="text"
                    placeholder="Enter a title for this card..."
                    value={title}
                    onChange={handleChange}
                    ref={inputRef}
                    onKeyPress={handleUserKeyPress} />
                <button>Add card</button>
                <section className="svg-holder">
                    <GrClose onClick={onToggleAdd} />
                </section>
            </form>
        </section>
    )
}