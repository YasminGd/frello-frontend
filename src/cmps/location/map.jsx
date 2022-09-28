import {
    StaticGoogleMap,
    Marker,
    Path,
} from 'react-static-google-map';

export const Map = ({ location }) => {

    return (
        // Important! Always set the container height explicitly
        <a href={`https://maps.google.com/?ll=${location.lat},${location.lng}, 15z`} target="_blank">
            <StaticGoogleMap size="512x160" className="img-fluid" apiKey="AIzaSyARPKA9DEEozpiVxh1VOPNsWveWnSlqZQI" zoom={14}>
                <Marker location={`${location.lat},${location.lng}`} color="blue" label="P" />
            </StaticGoogleMap>
        </a>
        // <StaticGoogleMap size="512X160" className="map" apiKey="AIzaSyARPKA9DEEozpiVxh1VOPNsWveWnSlqZQI">
        //     <Marker location={`${location.lat},${location.lng}`} color="blue" label="P" />
        // </StaticGoogleMap>
    )
}



