import { boardService } from '../../services/board.service'
import { groupService } from '../../services/group.service'
import { getActionUpdateBoard } from './board.action'

export function addGroup(title) {
  return async (dispatch, getState) => {
    const prevBoard = getState().boardModule.board
    const board = structuredClone(prevBoard)
    const updatedBoard = groupService.add(title, board)
    dispatch(getActionUpdateBoard(updatedBoard))

    try {
      await boardService.save(updatedBoard)
    }
    catch (err) {
      dispatch(getActionUpdateBoard({ ...prevBoard }))
      console.log('Cannot add group', err)
    }
  }
}

export function removeGroup(groupId) {
  return async (dispatch, getState) => {
    const prevBoard = getState().boardModule.board
    const board = structuredClone(prevBoard)
    const updatedBoard = groupService.remove(groupId, board)
    dispatch(getActionUpdateBoard(updatedBoard))

    try {
      await boardService.save(updatedBoard)
    }
    catch (err) {
      dispatch(getActionUpdateBoard({ ...prevBoard }))
      console.log('Cannot remove group', err)
    }
  }
}

export function updateGroupTitle(groupId, title) {
  return async (dispatch, getState) => {
    const prevBoard = getState().boardModule.board
    const board = structuredClone(prevBoard)
    const updatedBoard = groupService.updateGroupTitle(board, groupId, title)
    dispatch(getActionUpdateBoard(updatedBoard))

    try {
      await boardService.save(updatedBoard)
    }
    catch (err) {
      dispatch(getActionUpdateBoard({ ...prevBoard }))
      console.log('Cannot remove group', err)
    }
  }
}
