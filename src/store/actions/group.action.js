import { groupService } from "../../services/group.service"

export function addGroup(title) {
    return async (dispatch, getState) => {
        try {
            const board = getState().boardModule.board
            const savedBoard = await groupService.add(title, board)
            dispatch({ type: 'UPDATE_BOARD', board: savedBoard })
        }
        catch {

        }
    }
}

export function removeGroup(groupId) {
    return async (dispatch, getState) => {
        try {
            const board = getState().boardModule.board
            const savedBoard = await groupService.remove(groupId, board)
            const newBoard = {...savedBoard}
            dispatch({ type: 'UPDATE_BOARD', board: newBoard })
        }
        catch {

        }
    }
}