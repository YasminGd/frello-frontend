import axios from "axios"

export const locationService = {
    searchLocation,
}

const API_KEY = "AIzaSyARPKA9DEEozpiVxh1VOPNsWveWnSlqZQI"

async function searchLocation(name) {
    let locations
    try {
        const data = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=${API_KEY}`
        )
        locations = await data.data.results.map(location => ({
            address: location.formatted_address,
            location: location.geometry.location,
            name: location.address_components[0].short_name,
        }))
        //     let placesApi = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&key=AIzaSyARPKA9DEEozpiVxh1VOPNsWveWnSlqZQI.`)
        //     console.log(placesApi)
    } catch (err) {
        console.log(err)
    }
    return locations
}
