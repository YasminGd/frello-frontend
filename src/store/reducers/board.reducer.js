const initialState = {
  boards: [],
  board: null,
}

export function boardReducer(state = initialState, action) {

  switch (action.type) {
    case 'SET_BOARDS':
      state = { ...state, boards: action.boards }
      break

    case 'SET_BOARD':
      state = { ...state, board: action.board }
      break

    case 'ADD_BOARD':
      state = { ...state, boards: [...state.boards, action.board] }
      break

    case 'UPDATE_BOARD':
      state = { ...state, board: action.board }
      break

    default:
      return state
  }
  // For debug:
  window.boardState = state
  return state
}
