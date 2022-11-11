import { LocationPreview } from "./location-preview"

export const LocationList = ({ setLocation, locations }) => {
    return <section className="location-list">
        {
            locations.map(location => <LocationPreview key={location.name} location={location} setLocation={setLocation} />)
        }
    </section>
}