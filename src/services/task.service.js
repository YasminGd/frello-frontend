import { storageService } from "./async-storage.service"
import { boardService } from "./board.service"
import { utilService } from "./util.service"
const STORAGE_KEY = 'board'

export const taskService = {
    update,
    add,
    remove
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

async function add(title, groupId, board) {
    const group = board.groups.find(group => group.id === groupId)
    group.tasks.push({ title, id: utilService.makeId() })

    try {
        return await storageService.put(STORAGE_KEY, board)
    } catch (err) {
        console.log('cannot add task', err)
    }
    
    return board
}

async function remove(groupId, taskId, board) {
    const group = board.groups.find(group => group.id === groupId)
    group.tasks = group.tasks.filter(task => task.id !== taskId)

    try {
        return await storageService.put(STORAGE_KEY, board)
    } catch (err) {
        console.log('cannot delete task', err)
    }

    return board
}
