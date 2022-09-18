import { useEffect, useRef, useState } from "react"

export const CheckList = () => {
    const [title, setTitle] = useState('Checklist')

    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    const handleChange = ({ target }) => {
        const { value } = target
        setTitle(value)
    }

    return (<section className="check-list">
        <div className="input-container">
            <label htmlFor="addTitle">Title</label>
            <input
                ref={inputRef}
                id="addTitle"
                type="text"
                value={title}
                onChange={handleChange}
            />
        </div>
        <button className="blue">Add</button>
    </section>)
}