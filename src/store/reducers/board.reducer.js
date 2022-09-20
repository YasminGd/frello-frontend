const initialState = {
  boards: [],
  board: null
}

export function boardReducer(state = initialState, action) {
  let newState = state
  let boards

  switch (action.type) {
    case 'SET_BOARDS':
      newState = { ...state, boards: action.boards }
      break

    case 'SET_BOARD':
      let board
      if (!action.boardId) board = null
      board = state.boards.find(boardInState => boardInState._id === action.boardId) || null
      newState = { ...state, board }
      break

    case 'SET_BOARD_FROM_BACK':
      newState = { ...state, board: action.board }
      break

    case 'REMOVE_BOARD':
      boards = state.boards.filter(board => board._id !== action.boardId)
      newState = { ...state, boards }
      break

    case 'ADD_BOARD':
      newState = { ...state, boards: [...state.boards, action.board] }
      break

    case 'UPDATE_BOARD':
      boards = state.boards.map((board) => (board._id === action.board._id ? action.board : board))
      newState = { ...state, boards }
      if (state.board) {
        newState = { ...state, board: action.board }
      }
      break

    case 'UNDO_REMOVE_BOARD':
      if (state.lastRemovedBoard) {
        newState = { ...state, boards: [...state.boards, state.lastRemovedBoard] }
      }
      break

    default:
      return state
  }
  // For debug:
  window.boardState = newState
  return newState
}
