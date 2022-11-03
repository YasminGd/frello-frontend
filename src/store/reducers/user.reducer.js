import { userService } from "../../services/user.service"

const initialState = {
    user: userService.getLoggedInUser(),
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_USERS":
            state = { ...state, users: [...action.users] }
            break

        case "SET_USER":
            state = { ...state, user: action.user }
            break

        case "SET_LOGGEDIN_USER":
            state = { ...state, loggedInUser: { ...action.loggedInUser } }
            break

        default:
            return state
    }
    // For debug:
    window.boardState = state
    return state
}
