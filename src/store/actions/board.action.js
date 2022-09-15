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
  return async (dispatch) => {
    try {
      const savedBoard = await boardService.save(board)
      dispatch(getActionUpdateBoard(savedBoard))
    } catch (err) {
      console.log('Cannot update board', err)
    }
  }
}

// export function addToBoard(board) {
//   return (dispatch) => {
//     dispatch({
//       type: 'ADD_TO_BOARD',
//       board,
//     })
//   }
// }

// export function removeFromBoard(boardId) {
//   return (dispatch) => {
//     dispatch({
//       type: 'REMOVE_FROM_BOARD',
//       boardId,
//     })
//   }
// }

export function addItemToBoard(title, groupId, boardId) {
    return async (dispatch) => {
        const updatedBoard = await boardService.addItem(title, groupId, boardId)
        dispatch(updateBoard(updatedBoard))
    }
}

export function removeItemFromBoard(groupId, taskId, boardId) {
    return async (dispatch) => {
        const updatedBoard = await boardService.removeItem(groupId, taskId, boardId)
        dispatch(updateBoard(updatedBoard))
    }
}

// Demo for Optimistic Mutation
// (IOW - Assuming the server call will work, so updating the UI first)
// export function onRemoveBoardOptimistic(boardId) {

//     return (dispatch, getState) => {

//         dispatch({
//             type: 'REMOVE_BOARD',
//             boardId
//         })
//         showSuccessMsg('Board removed')

//         boardService.remove(boardId)
//             .then(() => {
//                 console.log('Server Reported - Deleted Succesfully');
//             })
//             .catch(err => {
//                 showErrorMsg('Cannot remove board')
//                 console.log('Cannot load boards', err)
//                 dispatch({
//                     type: 'UNDO_REMOVE_BOARD',
//                 })
//             })
//     }
// }
