export const LocationPreview = ({setLocation, location}) => {
    return <section className="location-preview" onClick={() => setLocation(location)}>
        {location.address}
    </section>
}