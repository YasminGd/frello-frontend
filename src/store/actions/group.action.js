import { groupService } from "../../services/group.service"
import { loadBoards } from "./board.action"

export function addGroup(title) {
    return async (dispatch, getState) => {
        try {
            const board = getState().boardModule.board
            const user = getState().userModule.user
            console.log(board);
            const savedBoard = await groupService.add(title, board, user)
            dispatch({ type: 'UPDATE_BOARD', board: { ...savedBoard } })
        }
        catch (err) {
            console.log('Cannot add group', err)
        }
    }
}

export function removeGroup(groupId) {
    return async (dispatch, getState) => {
        try {
            const board = getState().boardModule.board
            const user = getState().userModule.user
            const savedBoard = await groupService.remove(groupId, board, user)
            dispatch({ type: 'UPDATE_BOARD', board: { ...savedBoard } })
        }
        catch (err) {
            console.log('Cannot remove group', err)
        }
    }
}

export function updateGroupTitle(groupId, title) {
    return async (dispatch, getState) => {
        try {
            const board = getState().boardModule.board
            const savedBoard = await groupService.updateGroupTitle(board, groupId, title)
            dispatch({ type: 'UPDATE_BOARD', board: { ...savedBoard } })
        }
        catch (err) {
            console.log('Cannot remove group', err)
        }
    }
}