import axios from "axios"

export const locationService = {
    searchLocation
}

const API_KEY = 'AIzaSyARPKA9DEEozpiVxh1VOPNsWveWnSlqZQI'

async function searchLocation(name) {
    const data = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=${API_KEY}`)
    let locations = await data.data.results
    locations =  await locations.map(location => ({address: location.formatted_address, location: location.geometry.location, name:location.address_components[0].short_name} ))
    console.log(locations);
    return locations
}