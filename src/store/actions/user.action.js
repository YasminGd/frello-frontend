import { userService } from '../../services/user.service'

export function loadUsers() {
  return async (dispatch) => {
    try {
      const users = await userService.getUsers()
      dispatch({ type: 'SET_USERS', users })
    } catch (err) {
      console.log('Cannot load users', err)
    }
  }
}
