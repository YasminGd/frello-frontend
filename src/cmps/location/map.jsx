import {
    StaticGoogleMap,
    Marker,
    Path,
} from 'react-static-google-map';

export const Map = ({ location }) => {
    console.log(location);
    return (
        // Important! Always set the container height explicitly
        <a href={`https://www.google.pl/maps/@${location.lat},${location.lng},18z`} target="_blank">
            <StaticGoogleMap size="512x160" className="img-fluid" apiKey="AIzaSyARPKA9DEEozpiVxh1VOPNsWveWnSlqZQI" zoom={14}>
                <Marker location={`${location.lat},${location.lng}`} color="blue" label="P" />
            </StaticGoogleMap>
        </a>
    )
}



