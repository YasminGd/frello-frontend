import axios from "axios"

export const unsplashService = {
    getPhotos,
}

const KEY = 'photos'
const photos = _loadFromStorage(KEY) || null

async function getPhotos(searchWords) {
    // Defining our variables
    if(!searchWords && photos) return photos
    const BASE_URL = 'https://api.unsplash.com/photos/'
    const ACCESS_KEY = 'vuoea2539QLM1SmLGMMoXzzUFtAGa1No7X6sFclUQa4'
    let URL = `${BASE_URL}?client_id=${ACCESS_KEY}`
    if(searchWords) URL = URL + `/topics/${searchWords}/photos`
    try {
        const response = await axios.get(URL)
        const {data} = response
        const photos = data.map((photo) =>( {backgroundColor: photo.color, background:photo.urls.full }))
        console.log(photos);
        _saveToStorage(KEY,photos)
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
