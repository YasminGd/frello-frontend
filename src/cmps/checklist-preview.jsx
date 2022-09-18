import { useState } from "react"
import { BsCheck2Square } from "react-icons/bs"
import { AddItem } from "./add-item"
import { AddTodo } from "./add-todo"
import { TodoList } from "./TodoList"

export const ChecklistPreview = ({ checkList, updateTodo, deleteChecklist }) => {
    const [isAddTodo, setIsAddTodo] = useState(false)

    const onAddTodo = () => {
        setIsAddTodo(!isAddTodo)
    }

    return (<section className="checklist-preview">
        <section className="checklist-header">
            <section className="left">
                <BsCheck2Square />
                <h3>{checkList.title}</h3>
            </section>
            <section className="right">
                <button className="button-link" onClick={() => deleteChecklist(checkList.id)}>Delete</button>
            </section>
        </section>
        <section className="checklist-status">
            <p>0%</p>
            <div className="completion-bar"></div>
        </section>
        {checkList.todos && checkList.todos.length > 0 && <TodoList todos={checkList.todos} checkListId={checkList.id} updateTodo={updateTodo} />}
        <section className="add-todo">
            {isAddTodo ?
                <AddTodo /> :
                <button className="add-todo-button" onClick={onAddTodo}>Add an item</button>
            }
        </section>
    </section>)
}