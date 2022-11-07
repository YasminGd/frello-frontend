const initialState = {
  boards: [],
  board: null,
}

export function boardReducer(state = initialState, action) {
  // let newState = state
  let boards

  switch (action.type) {
    case 'SET_BOARDS':
      state = { ...state, boards: action.boards }
      break

    //TODO: change name and check if lines 17-23 are neccessary
    case 'SET_BOARD':
      // let board
      // if (!action.boardId) board = null
      // board =
      //   state.boards.find(
      //     (boardInState) => boardInState._id === action.boardId
      //   ) || null
      state = { ...state, board: null }
      break

    case 'SET_BOARD_FROM_BACK':
      state = { ...state, board: action.board }
      break

    case 'REMOVE_BOARD':
      boards = state.boards.filter((board) => board._id !== action.boardId)
      state = { ...state, boards }
      break

    case 'ADD_BOARD':
      state = { ...state, boards: [...state.boards, action.board] }
      break

    case 'UPDATE_BOARD':
      state = { ...state, board: action.board }
      break

    case 'UPDATE_BOARDS':
      boards = state.boards.map((board) =>
        board._id === action.board._id ? action.board : board
      )
      state = { ...state, boards }
      break

    default:
      return state
  }
  // For debug:
  window.boardState = state
  return state
}
