import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface MapViewChangerProps {
  activeCompound: { id: number; location: string; price: number; image: string; position: [number, number]; } | null;
}

const MapViewChanger: React.FC<MapViewChangerProps> = ({ activeCompound }) => {
  const map = useMap();

  useEffect(() => {
    if (activeCompound) {
      map.setView(activeCompound.position, 13);
    }
  }, [activeCompound, map]);

  return null;
};

export default MapViewChanger;
