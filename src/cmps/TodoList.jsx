import { TodoPreview } from "./TodoPreview"

export const TodoList = ({ todos, checkListId, updateTodo }) => {
    return <section className="todo-list">
        {
            todos.map(todo => <TodoPreview todo={todo} checkListId={checkListId} updateTodo={updateTodo} />)
        }
    </section>
}