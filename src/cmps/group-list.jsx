import { useState } from 'react';
import { AddNew } from './add-new.jsx';
import { GroupPreview } from './group-preview.jsx'

export const GroupList = ({ board, addItem }) => {
    const [isAddOpen, setIsAddOpen] = useState(false)

    const onToggleAdd = () => {
        setIsAddOpen(!isAddOpen)
    }

    return <section className="group-list">
        {
            board.groups.map(group => <GroupPreview group={group} addItem={addItem} />)
        }
        {
            isAddOpen ? <AddNew onToggleAdd={onToggleAdd} addItem={addItem} /> :
                <button className="add-task-button" onClick={onToggleAdd}>
                    Add a card
                </button>
        }
    </section>
}