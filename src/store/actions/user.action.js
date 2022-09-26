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

export function loadUser() {
  return async (dispatch) => {
    try {
      const loggedInUser = await userService.getLoggedInUser()
      dispatch({ type: 'SET_LOGGEDIN_USER', loggedInUser })
    } catch (err) {
      console.log('Cannot get loggedInUser', err)
    }
  }
}

export function signup(credentials, isGoogleAuth) {
  return async (dispatch) => {
    try {
      const signedUser = await userService.signup(credentials, isGoogleAuth)
      dispatch({ type: 'SET_USER', user: signedUser })
    } catch (err) {
      console.log(`Cannot signup`, err)
      throw err
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
      throw err
    }
  }
}

export function logout() {
  return async (dispatch) => {
    try {
      await userService.logout()
      dispatch({ type: 'SET_USER', user: null })
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
