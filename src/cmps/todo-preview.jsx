export const TodoPreview = ({ todo, checkListId, updateTodo }) => {

    const onChangeTodoDone = () => {
        todo.isDone = !todo.isDone
        updateTodo(todo, checkListId)
    }

    return <section className="todo-preview">
        <input type="checkbox" checked={todo.isDone} onChange={onChangeTodoDone} />
        <p>{todo.title}</p>
    </section>
}