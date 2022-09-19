import { useState } from "react"
import { BsThreeDots } from "react-icons/bs"
import { GrClose } from "react-icons/gr"
import { EditTitle } from "./edit-title"
import { EditTodo } from "./edit-todo"

export const TodoPreview = ({ todo, checkListId, updateTodo, removeTodo }) => {
    const [isEditTitleOpen, setIsEditTitleOpen] = useState(false)

    const toggleTitleEdit = () => {
        setIsEditTitleOpen(!isEditTitleOpen)
    }

    const onChangeTodoDone = () => {
        todo.isDone = !todo.isDone
        updateTodo(todo, checkListId)
    }

    const editTitle = (title) => {
        todo.title = title
        updateTodo(todo, checkListId)
    }

    const onRemoveTodo = (ev) => {
        ev.stopPropagation()
        removeTodo(todo.id, checkListId)
    }

    return <section className="todo-preview">
        <input type="checkbox" checked={todo.isDone} onChange={onChangeTodoDone} />

        {isEditTitleOpen ?
            <EditTitle itemTitle={todo.title} editTitle={editTitle} toggleTitleEdit={toggleTitleEdit} /> :
            <section className="title" onClick={toggleTitleEdit}>
                <p className={todo.isDone ? 'crossed-out' : ''}>{todo.title}</p>
                <button className="close-btn" onClick={onRemoveTodo}><BsThreeDots /></button>
            </section>
        }
    </section>
}