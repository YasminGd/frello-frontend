import { storageService } from "./async-storage.service"
import { boardService } from "./board.service"
const STORAGE_KEY = 'board'

export const taskService = {
    update
    // query,
    // getById,
    // save,
    // remove,
}

async function update(board, groupId, taskId, task) {
    const groupIdx = board.groups.findIndex(group => group.id === groupId)
    const taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === taskId)
    board.groups[groupIdx].tasks.splice(taskIdx, 1, task)

    try {
        return await storageService.put(STORAGE_KEY, board)
    } catch (err) {
        console.log('cannot update task', err)
    }

}

