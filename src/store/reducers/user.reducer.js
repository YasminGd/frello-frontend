import { userService } from '../../services/user.service'
import { loadUsers } from '../actions/user.action'

const initialState = {
  // loggedInUser: userService.getLoggedInUser(),
  //   users:
  //     userService.getUsers().then((users) => {
  //       console.log(`users:`, users)
  //       return users
  //     }) || [],
  //   users: (() => {
  //     console.log(userService.getUsers())
  //   })(),
  users: [],
  user: null
}

export function userReducer(state = initialState, action) {
  switch (action.type) {

    case 'SET_USERS':
      state = { ...state, users: [...action.users] }
      break

    case 'SET_LOGGEDIN_USER':
      state = { ...state, loggedInUser: { ...action.loggedInUser } }

    default:
      return state
  }
  // For debug:
  window.boardState = state
  return state
}
