import { MapContainer, TileLayer } from "react-leaflet";
import { Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Map() {
    return (
        <div className="relative z-0">
            <MapContainer
                center={[46.770439, 23.591423]}
                zoom={13}
                scrollWheelZoom={false}
                className="w-80 h-80 sm:w-96 sm:h-96 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px]"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[46.770439, 23.591423]}>
                    <Popup>
                        Barber Shop <br /> Cluj-Napoca
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
