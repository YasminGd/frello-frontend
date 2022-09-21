import { httpService } from './http.service'
import { utilService } from './util.service'

export const userService = {
  getUsers,
  login,
  logout,
  signup,
  getLoggedInUser,
}

const STORAGE_KEY_LOGGEDIN = 'loggedInUser'
const BASE_URL = `user/`

async function login(credentials) {
  try {
    const user = await httpService.post('auth/login', credentials)
    if (user) sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
  } catch (err) {
    console.log('Cannot login', err)
  }
}

async function logout() {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, null)
  try {
    return await httpService.post('auth/logout')
  } catch (err) {
    console.log(`Cannot logout:`, err)
  }
}

async function signup(credentials) {
  try {
    await httpService.post('auth/signup', credentials)
    return login(credentials)
  } catch (err) {
    console.log('Cannot signup', err)
  }
}

function getLoggedInUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN)) ||
  // console.log('getLoggedInUser ~ user', user)
  {
    fullname: 'Guest',
    username: 'Guest',
    imgUrl: 'http://res.cloudinary.com/frello/image/upload/v1663584273/u9nkwkywyxv8mogk9q2b.jpg',
    id: utilService.makeId()
  }
}

async function getUsers() {
  try {
    console.log('GET USERS')
    const users = await httpService.get(BASE_URL)
    // console.log(`users:`, users)
    if (users)
      return new Promise((resolve, reject) => {
        resolve(users)
      })
    // console.log(`users:`, users)
    // if (!users) return []
    // return users
  } catch (err) {
    console.log('Cannot get users ', err)
  }
}
