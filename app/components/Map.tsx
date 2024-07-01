import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { DivIcon } from "leaflet";
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

// Function to create a custom icon with a compound name
const createCustomIcon = (name: string): DivIcon => {
  return L.divIcon({
    className: "custom-icon",
    html: `<div style="background-color: white; padding: 5px; border-radius: 5px; border: none; font-size:14px; font-weight:bold;">${name}</div>`,
    iconSize: [100, 40], // size of the icon
    iconAnchor: [50, 20], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -20], // point from which the popup should open relative to the iconAnchor
  });
};

const Map: React.FC<MapProps> = ({ compounds, activeCompound }) => {
  return (
    <MapContainer
      center={[30.002926, 31.419978]}
      zoom={13}
      className="w-full h-full md:h-screen"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {compounds.map((compound) => (
        <Marker
          key={compound.id}
          position={compound.position}
          icon={createCustomIcon(compound.location)}
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
