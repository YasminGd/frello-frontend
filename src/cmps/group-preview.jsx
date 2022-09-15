import { useState } from 'react'
import { AddNew } from './add-new.jsx'
import { TaskList } from './task-list.jsx'


export const GroupPreview = ({ group, addItem }) => {
    const [isAddOpen, setIsAddOpen] = useState(false)

    const onToggleAdd = () => {
        setIsAddOpen(!isAddOpen)
    }

    return <section className="group-preview">
        <section className="group-title">
            <p>{group.title}</p>
        </section>
        <TaskList tasks={group.tasks} groupId={group.id}/>
        {
            isAddOpen ? <AddNew onToggleAdd={onToggleAdd} addItem={addItem} groupId={group.id}/> :
                <button className="add-task-button" onClick={onToggleAdd}>
                    Add a card
                </button>
        }
    </section>
}