import { useDispatch } from "react-redux"
import { updateTask } from "../store/actions/task.action"
import { ChecklistPreview } from "./checklist-preview"

export const CheckListList = ({ task, groupId }) => {

    const dispatch = useDispatch()

    const updateTodo = (editedTodo, checkListId) => {
        const checkList = task.checklists.find(checkList => checkList.id === checkListId)
        checkList.todos = checkList.todos.filter(todo => todo.id === editedTodo.id ? editedTodo : todo)
        dispatch(updateTask(groupId, task))
    }

    const deleteChecklist = (checklistId) => {
        task.checklists = task.checklists.filter(checklist => checklist.id !== checklistId)
        dispatch(updateTask(groupId, task))
    }

    return (
        <section className="checklist-list">
            {
                task.checklists.map(checkList =>
                    <ChecklistPreview
                        checkList={checkList}
                        updateTodo={updateTodo}
                        deleteChecklist={deleteChecklist}
                         />)
            }
        </section>
    )
}
