import { taskService } from "../../services/task.service"

export function updateTask(groupId, taskId, task) {
    return async (dispatch, getState) => {
        try {
            const board = getState().boardModule.board
            const savedBoard = await taskService.update(board, groupId, taskId, task)
            dispatch({ type: 'UPDATE_BOARD', board: savedBoard })
        } catch (err) {
            console.log('Cannot update task', err)
        }
    }
}