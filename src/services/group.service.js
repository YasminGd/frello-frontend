import { storageService } from "./async-storage.service"
import { boardService } from "./board.service"
import { utilService } from "./util.service"
const STORAGE_KEY = 'board'

export const groupService = {
    add,
    remove
}

async function add(title, board) {
    board.groups.push({ title, id: utilService.makeId(), tasks: [] })

    try {
        return await storageService.put(STORAGE_KEY, board)
    } catch (err) {
        console.log('cannot add task', err)
    }

    return board
}

async function remove(groupId, board) {
    board.groups = board.groups.filter(group => group.id !== groupId)
    try {
        return await storageService.put(STORAGE_KEY, board)
    } catch (err) {
        console.log('cannot delete task', err)
    }

    return board
}
