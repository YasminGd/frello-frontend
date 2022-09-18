import { useDispatch } from "react-redux"
import { updateTask, addNewTodo } from "../store/actions/task.action"
import { ChecklistPreview } from "./checklist-preview"

export const CheckListList = ({ task, groupId }) => {

    const dispatch = useDispatch()

    const deleteChecklist = (checklistId) => {
        task.checklists = task.checklists.filter(checklist => checklist.id !== checklistId)
        dispatch(updateTask(groupId, task))
    }

    const updateChecklist = (editedChecklist) => {
        task.checklists = task.checklists.filter(checklist => checklist.id === editedChecklist.id ? editedChecklist : checklist)
        dispatch(updateTask(groupId, task))
    }

    const addTodo = (title, checkListId) => {
        dispatch(addNewTodo(title, checkListId, task.id, groupId))
    }

    const updateTodo = (editedTodo, checkListId) => {
        const checkList = task.checklists.find(checkList => checkList.id === checkListId)
        checkList.todos = checkList.todos.filter(todo => todo.id === editedTodo.id ? editedTodo : todo)
        dispatch(updateTask(groupId, task))
    }



    return (
        <section className="checklist-list">
            {
                task.checklists.map(checkList =>
                    <ChecklistPreview
                        checkList={checkList}
                        updateTodo={updateTodo}
                        addTodo={addTodo}
                        deleteChecklist={deleteChecklist}
                        updateChecklist={updateChecklist}
                    />)
            }
        </section>
    )
}
