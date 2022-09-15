import { useState } from 'react'
import { AddNew } from './add-new.jsx'
import { TaskList } from './task-list.jsx'


export const GroupPreview = ({ group, addItem, removeItem }) => {
    const [isAddOpen, setIsAddOpen] = useState(false)

    const onToggleAdd = () => {
        setIsAddOpen(!isAddOpen)
    }

    return <section className="group-preview">
        <section className="group-title">
            <p>{group.title}</p>
            <button onClick={() => removeItem(group.id,)}>…</button>
        </section>
        <TaskList tasks={group.tasks} groupId={group.id} removeItem={removeItem}/>
        {
            isAddOpen ? <AddNew onToggleAdd={onToggleAdd} addItem={addItem} groupId={group.id}/> :
                <button className="add-task-button" onClick={onToggleAdd}>
                    Add a card
                </button>
        }
    </section>
}