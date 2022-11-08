import { activityService } from '../../services/activity.service.js'
import { boardService } from '../../services/board.service.js'

// Action Creators:
export function getActionRemoveBoard(boardId) {
  return {
    type: 'REMOVE_BOARD',
    boardId,
  }
}

export function getActionAddBoard(board) {
  return {
    type: 'ADD_BOARD',
    board,
  }
}

export function getActionUpdateBoard(board) {
  return {
    type: 'UPDATE_BOARD',
    board,
  }
}

export function loadBoards() {
  return async (dispatch) => {
    try {
      const boards = await boardService.query()
      dispatch({
        type: 'SET_BOARDS',
        boards: [...boards],
      })
    } catch (err) {
      console.log('Cannot load boards', err)
    }
  }
}

export function removeBoard(boardId) {
  return async (dispatch) => {
    try {
      await boardService.remove(boardId)
      console.log('Deleted Succesfully!')
      dispatch(getActionRemoveBoard(boardId))
    } catch (err) {
      console.log('Cannot remove board', err)
    }
  }
}

export function addBoard(board) {
  return async (dispatch) => {
    try {
      const savedBoard = await boardService.save(board)
      dispatch(getActionAddBoard({ ...savedBoard }))
    } catch (err) {
      console.log(`cannot add board:`, err)
    }
  }
}

export function getBoard(boardId) {
  return async (dispatch) => {
    try {
      const board = await boardService.getById(boardId)
      dispatch({ type: 'SET_BOARD_FROM_BACK', board: { ...board } })
    } catch (err) {
      console.log(`cannot add board:`, err)
    }
  }
}

export function updateBoard(board) {
  return async (dispatch, getState) => {
    const prevBoard = { ...getState().boardModule.board }
    dispatch(getActionUpdateBoard({ ...board }))

    try {
      await boardService.save(board)
    } catch (err) {
      dispatch(getActionUpdateBoard(prevBoard))
      console.log('Cannot update board', err)
    }
  }
}

export function addNewComment(txt, task, comment) {
  return async (dispatch, getState) => {
    const prevBoard = getState().boardModule.board
    const board = structuredClone(prevBoard)
    const updatedBoard = activityService.addActivity(txt, task, board, comment)
    dispatch(getActionUpdateBoard(updatedBoard))

    try {
      await boardService.save(updatedBoard)
    } catch (err) {
      dispatch(getActionUpdateBoard({ ...prevBoard }))
      console.log('Cannot add todo', err)
    }
  }
}
