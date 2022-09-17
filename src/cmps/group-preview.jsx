import { useState } from 'react'
import { AddItem } from './add-item.jsx'
import { TaskList } from './task-list.jsx'
import { DynamicTextarea } from './dynamic-textarea.jsx'


export const GroupPreview = ({ group, addItem, removeItem }) => {
    const [isAddOpen, setIsAddOpen] = useState(false)

    const onToggleAdd = () => {
        setIsAddOpen(!isAddOpen)
    }

    const textareaStyle = { width: "100%", height: "28px", fontSize: "14px" }

    return <section className="group-preview">
        <section className="group-title">
            {/* <p>{group.title}</p> */}
            <DynamicTextarea entity={group} type={'group'} groupId={group.id} style={textareaStyle} />
            <button onClick={() => removeItem(group.id,)}>…</button>
        </section>
        <TaskList tasks={group.tasks} groupId={group.id} removeItem={removeItem} />
        {
            isAddOpen ? <AddItem onToggleAdd={onToggleAdd} addItem={addItem} groupId={group.id} /> :
                <button className="add-task-button" onClick={onToggleAdd}>
                    Add a card
                </button>
        }
    </section>
}