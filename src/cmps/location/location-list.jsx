import { LocationPreview } from "./location-preview"

export const LocationList = ({ setLocation, locations }) => {
    return <section className="location-list">
        {
            locations.map(location => <LocationPreview location={location} setLocation={setLocation} />)
        }
    </section>
}