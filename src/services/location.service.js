import axios from 'axios'

export const locationService = {
  searchLocation,
}

const API_KEY = 'AIzaSyC2yfNJWgZ-aU8kxmkHfL5bIRyLP5PgcpA'

async function searchLocation(name) {
  let locations
  try {
    const data = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=${API_KEY}`
    )
    locations = await data.data.results.map((location) => ({
      address: location.formatted_address,
      location: location.geometry.location,
      name: location.address_components[0].short_name,
    }))
  } catch (err) {
    console.log(err)
  }
  return locations
}
