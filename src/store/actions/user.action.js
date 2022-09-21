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

export function signup(credentials) {
  return async (dispatch) => {
    try {
      const signedUser = await userService.signup(credentials)
      dispatch({ type: 'SET_USER', user: signedUser })
    } catch (err) {
      console.log(`Cannot signup`, err)
    }
  }
}

export function login(credentials) {
  return async (dispatch) => {
    try {
      const user = await userService.login(credentials)
      dispatch({ type: 'SET_USER', user })
    } catch (err) {
      console.log('Cannot login', err)
    }
  }
}

export function getLoggedInUser() {
  return async (dispatch) => {
    const user = await userService.getLoggedInUser()
    dispatch({ type: 'SET_USER', user })
  }
}
