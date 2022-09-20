import { storageService } from "./async-storage.service"
import { boardService } from "./board.service"
import { utilService } from "./util.service"
const STORAGE_KEY = 'board'

export const groupService = {
    add,
    remove,
    updateGroupTitle
}

async function add(title, board, user) {
    board.groups.push({ title, id: utilService.makeId(), tasks: [] })
    const boardWithActivities = boardService.addActivity(`Added ${title} to this board`, null, user, board)

    try {
        return await storageService.put(STORAGE_KEY, boardWithActivities)
    } catch (err) {
        console.log('cannot add task', err)
    }

    return boardWithActivities
}

async function remove(groupId, board, user) {
    const title = board.groups.find(group => group.id === groupId).title
    board.groups = board.groups.filter(group => group.id !== groupId)
    const boardWithActivities = boardService.addActivity(`Removed list ${title}`, null, user, board)

    try {
        return await storageService.put(STORAGE_KEY, boardWithActivities)
    } catch (err) {
        console.log('cannot delete task', err)
    }

    return boardWithActivities
}

async function updateGroupTitle(board, groupId, title) {
    const group = board.groups.find(group => group.id === groupId)
    group.title = title
    try {
        return await storageService.put(STORAGE_KEY, board)
    } catch (err) {
        console.log('cannot delete task', err)
    }

    return board
}
