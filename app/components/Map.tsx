import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MapViewChanger from "./MapViewChanger";

interface Compound {
  id: number;
  location: string;
  price: number;
  image: string;
  position: [number, number];
}

interface MapProps {
  compounds: Compound[];
  activeCompound: Compound | null;
}

// Define a custom icon for the markers
const customIcon = new L.Icon({
  iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-green.png",
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowUrl: "https://leafletjs.com/examples/custom-icons/leaf-shadow.png",
  shadowSize: [50, 64],
  shadowAnchor: [4, 62],
});

const Map: React.FC<MapProps> = ({ compounds, activeCompound }) => {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {compounds.map((compound) => (
        <Marker
          key={compound.id}
          position={compound.position}
          icon={customIcon}
        >
          <Popup>
            <div>
              <img
                src={compound.image}
                alt={compound.location}
                style={{ width: "100px", height: "auto" }}
              />
              <h3>{compound.location}</h3>
              <p>${compound.price.toLocaleString()}</p>
            </div>
          </Popup>
        </Marker>
      ))}
      <MapViewChanger activeCompound={activeCompound} />
    </MapContainer>
  );
};

export default Map;
