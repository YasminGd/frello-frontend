import axios from "axios"

export const unsplashService = {
    getPhotos,
}

async function getPhotos() {
    // Defining our variables
    const BASE_URL = 'https://api.unsplash.com/photos/'
    const ACCESS_KEY = 'vuoea2539QLM1SmLGMMoXzzUFtAGa1No7X6sFclUQa4'
    const URL = `${BASE_URL}?client_id=${ACCESS_KEY}`
    try {
        const response = await axios.get(URL)
        return response.data
    } catch (err) {
        console.error('ERROR!', err)
    }
}
