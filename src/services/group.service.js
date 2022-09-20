import { activityService } from "./activity.service"
import { storageService } from "./async-storage.service"
import { boardService } from "./board.service"
import { httpService } from "./http.service"
import { utilService } from "./util.service"
const STORAGE_KEY = 'board'
const BASE_URL = `board/`

export const groupService = {
    add,
    remove,
    updateGroupTitle
}

async function add(title, board, user) {
    board.groups.push({ title, id: utilService.makeId(), tasks: [] })
    const boardWithActivities = activityService.addActivity(`Added ${title} to this board`, null, user, board)

    try {
        return httpService.put(BASE_URL + board._id, boardWithActivities)
        return await storageService.post(STORAGE_KEY, boardWithActivities)
    }
    catch (err) {
        console.log('cannot add group', err)
    }
}

async function remove(groupId, board, user) {
    const title = board.groups.find(group => group.id === groupId).title
    board.groups = board.groups.filter(group => group.id !== groupId)
    const boardWithActivities = activityService.addActivity(`Removed list ${title}`, null, user, board)

    try {
        return await httpService.put(BASE_URL + board._id, boardWithActivities)
        return await storageService.put(STORAGE_KEY, boardWithActivities)
    }
    catch (err) {
        console.log('cannot delete group', err)
    }
}

async function updateGroupTitle(board, groupId, title) {
    const group = board.groups.find(group => group.id === groupId)
    group.title = title
    try {
        return httpService.put(BASE_URL + board._id, board)
        return await storageService.put(STORAGE_KEY, board)
    }
    catch (err) {
        console.log('cannot update group', err)
    }
}
