import axios from 'axios'

export const unsplashService = {
  getPhotos,
}

const STORAGE_KEY = 'photos'
const photos = _loadFromStorage(STORAGE_KEY) || null
const API_KEY = 'vuoea2539QLM1SmLGMMoXzzUFtAGa1No7X6sFclUQa4'

async function getPhotos(searchWords) {
  if (!searchWords && photos) return photos
  let URL = `https://api.unsplash.com/photos/random?count=30${
    searchWords ? `&query=${searchWords}` : ''
  }&client_id=${API_KEY}`
  try {
    const response = await axios.get(URL)
    const { data } = response
    const photos = data.map((photo) => ({
      backgroundColor: photo.color,
      background: photo.urls.full,
      thumbnail: photo.urls.small,
    }))
    _saveToStorage(STORAGE_KEY, photos)
    return photos
  } catch (err) {
    console.error('ERROR!', err)
  }
}

function _saveToStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}

function _loadFromStorage(key) {
  var val = localStorage.getItem(key)
  return JSON.parse(val)
}
