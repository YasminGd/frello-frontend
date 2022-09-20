import { httpService } from './http.service'

export const userService = {
  getUsers,
}

const BASE_URL = `user/`

async function getUsers() {
  try {
    console.log('GET USERS')
    const users = await httpService.get(BASE_URL)
    console.log(`users:`, users)
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
