const initialState = {
    user: null
}

export function userReducer(state = initialState, action) {
    let newState = state
    let boards

    switch (action.type) {
        default:
            return state
    }
    // For debug:
    window.boardState = newState
    return newState
}