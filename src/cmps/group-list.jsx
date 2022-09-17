import { useState } from 'react'
import { AddItem } from './add-item.jsx'
import { GroupPreview } from './group-preview.jsx'

export const GroupList = ({ board, addItem, removeItem }) => {
    const [isAddOpen, setIsAddOpen] = useState(false)

    const onToggleAdd = () => {
        setIsAddOpen(!isAddOpen)
    }

    return <section className="group-list">
        {
            board.groups.map(group => <GroupPreview key={group.id} group={group} addItem={addItem} removeItem={removeItem} />)
        }
        {
            isAddOpen ? <AddItem onToggleAdd={onToggleAdd} addItem={addItem} /> :
                <button className="add-task-button" onClick={onToggleAdd}>
                    Add a card
                </button>
        }
    </section>
}