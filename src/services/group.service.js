import { activityService } from "./activity.service"
import { utilService } from "./util.service"

export const groupService = {
    add,
    remove,
    updateGroupTitle
}

function add(title, board) {
    board.groups.push({ title, id: utilService.makeId(), tasks: [] })
    return activityService.addActivity(`Added ${title} to this board`, null, board)
}

function remove(groupId, board) {
    const title = board.groups.find(group => group.id === groupId).title
    board.groups = board.groups.filter(group => group.id !== groupId)
    return activityService.addActivity(`Removed list ${title}`, null, board)
}

function updateGroupTitle(board, groupId, title) {
    const group = board.groups.find(group => group.id === groupId)
    group.title = title
    return board
}
