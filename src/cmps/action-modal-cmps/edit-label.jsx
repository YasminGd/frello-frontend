import { useState } from "react"
import { ColorPallet } from "../color-pallet"
import { IoCloseOutline } from 'react-icons/io5'

export const EditLabel = ({ onToggleLabelEdit, label }) => {

    const [labelTitle, setLabelTitle] = useState(label.title)
    const [selectedColor, setSelectedColor] = useState(null)

    const handleChange = ({ target }) => {
        if (target.type === 'text') {
            setLabelTitle(target.value)
        }
    }

    return (
        <section className="edit-label">
            <p className="sub-title">Title</p>
            <input
                className="label-title"
                onChange={handleChange}
                type="text"
                autoFocus
                value={labelTitle} />
            <p className="sub-header">Select a color</p>
            <ColorPallet setSelectedColor={setSelectedColor} selectedColor={selectedColor} />
            <div className="btn-container">
                <button className="btn-remove-color" onClick={() => { setSelectedColor(null) }}>
                    <IoCloseOutline className="icon-close" />
                    Remove color
                </button>
            </div>
            <div className="save-remove">
                <button className="btn-save">Save</button>
                <button className="btn-remove">Delete</button>
            </div>
        </section>
    )
}