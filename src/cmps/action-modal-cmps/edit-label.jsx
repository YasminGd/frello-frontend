import { useState } from "react"
import { ColorPallet } from "../color-pallet"
import { IoCloseOutline } from 'react-icons/io5'

export const EditLabel = ({ onToggleLabelEdit, label, onSaveLabel, onRemoveLabel }) => {

    const [labelTitle, setLabelTitle] = useState(label.title)
    const [selectedColor, setSelectedColor] = useState(label.color)

    const handleChange = ({ target }) => {
        if (target.type === 'text') {
            setLabelTitle(target.value)
        }
    }

    const onSaveButton = () => {
        label.class = selectedColor.slice(0, -10) + '-opacity'
        label.title = labelTitle
        label.color = selectedColor.slice(0, -10)
        onSaveLabel(label)
        onToggleLabelEdit(null)
    }

    const onRemoveButton = () => {
        onToggleLabelEdit(null)
        onRemoveLabel(label.id)
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
                <button onClick={onSaveButton} className="btn-save">Save</button>
                <button onClick={onRemoveButton} className="btn-remove">Delete</button>
            </div>
        </section>
    )
}