import { boardService } from "../../services/board.service.js"
import { userService } from "../../services/user.service.js"

// Action Creators:
export function getActionRemoveBoard(boardId) {
    return {
        type: 'REMOVE_BOARD',
        boardId
    }
}

export function getActionAddBoard(board) {
    return {
        type: 'ADD_BOARD',
        board
    }
}

export function getActionUpdateBoard(board) {
    return {
        type: 'UPDATE_BOARD',
        board
    }
}

export function loadBoards() {
    return async (dispatch) => {
        try {
            const boards = await boardService.query()
            console.log('Boards from LocalStorage:', boards)
            dispatch({
                type: 'SET_BOARDS',
                boards
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
            console.log('Deleted Succesfully!');
            dispatch(getActionRemoveBoard(boardId))
        } catch (err) {
            console.log('Cannot remove board', err)
        }
    }
}

export function addBoard(board) {
    return (dispatch) => {

        boardService.save(board)
            .then(savedBoard => {
                console.log('Added Board', savedBoard);
                dispatch(getActionAddBoard(savedBoard))
            })
            .catch(err => {
                console.log('Cannot add board', err)
            })
    }
}

export function updateBoard(board) {
    return (dispatch) => {
        boardService.save(board)
            .then(savedBoard => {
                console.log('Updated Board:', savedBoard);
                dispatch(getActionUpdateBoard(savedBoard))
            })
            .catch(err => {
                console.log('Cannot save board', err)
            })
    }
}

export function addToBoard(board) {
    return (dispatch) => {
        dispatch({
            type: 'ADD_TO_BOARD',
            board
        })
    }
}
export function removeFromBoard(boardId) {
    return (dispatch) => {
        dispatch({
            type: 'REMOVE_FROM_BOARD',
            boardId
        })
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