const initialState = {
    user: 
    {
        fullname:"Yasmin Gudha",
        imgUrl: 'https://res.cloudinary.com/frello/image/upload/v1663581895/hx94mf1jqzol7neds3yj.jpg'
    }
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