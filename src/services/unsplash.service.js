import axios from "axios"

export const unsplashService = {
    getPhotos,
}

const KEY = 'photos'
const photos = _loadFromStorage(KEY) || null

async function getPhotos(searchWords) {
    // Defining our variables
    console.log(searchWords);
    if (!searchWords && photos) return photos
    const ACCESS_KEY = 'vuoea2539QLM1SmLGMMoXzzUFtAGa1No7X6sFclUQa4'
    let URL = `https://api.unsplash.com/photos/random?count=30${searchWords ?`&query=${searchWords}`: ''}&client_id=${ACCESS_KEY}`
    // let URL = `https://api.unsplash.com/search/photos?page=1&per_page=30${searchWords ?`&query=${searchWords}`: ''}&client_id=${ACCESS_KEY}`
    try {
        console.log(URL);
        const response = await axios.get(URL)
        const { data } = response
        console.log(data);
        const photos = data.map((photo) => ({ backgroundColor: photo.color, background: photo.urls.full, thumbnail: photo.urls.small }))
        _saveToStorage(KEY, photos)
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
