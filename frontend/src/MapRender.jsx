import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"

function MapView({ lat, lon, placeName }) {
    console.log(18)
    if (!lat || !lon) return <p>No coordinates yet</p>

    return (
        <MapContainer center={[lat, lon]} zoom={13} style={{ height: "400px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />    
        <Marker position={[lat, lon]}>
            <Popup>{placeName || "Unknown place"}</Popup>
        </Marker>
        </MapContainer>
    )
}

export default MapView