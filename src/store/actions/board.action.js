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
        boards,
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
      dispatch(getActionAddBoard(savedBoard))

    } catch (err) {
      console.log(`cannot add board:`, err)
    }
  }
}

export function updateBoard(board) {

  return async (dispatch, getState) => {
    const prevBoard = { ...getState().boardModule.board }
    dispatch(getActionUpdateBoard(board))

    try {
      await boardService.save(board)
    }
    catch (err) {
      dispatch(getActionUpdateBoard(prevBoard))
      console.log('Cannot update board', err)
    }
  }
}

// export function addItemToBoard(title, groupId, boardId) {
//   return async (dispatch) => {
//     try {
//       const updatedBoard = await boardService.addItem(title, groupId, boardId)
//       dispatch(updateBoard(updatedBoard))

//     } catch (err) {
//       console.log(`cannot add item to board:`, err)
//     }
//   }
// }

// export function removeItemFromBoard(groupId, taskId, boardId) {
//   return async (dispatch) => {
//     try {
//       const updatedBoard = await boardService.removeItem(groupId, taskId, boardId)
//       dispatch(updateBoard(updatedBoard))
//     } catch (err) {
//       console.log(`cannot remove item from board:`, err)
//     }
//   }
// }

// export function addActivityToBoard(txt, task) {
//   return async (dispatch, getState) => {
//     try {
//       const board = getState().boardModule.board
//       const user = getState().userModule.user
//       const updatedBoard = await boardService.addActivityToBoard(board, txt, task, user)
//       dispatch(updateBoard(updatedBoard))
//     } catch (err) {
//       console.log(`cannot remove item from board:`, err)
//     }
//   }
// }
