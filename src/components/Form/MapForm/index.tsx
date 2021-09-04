import { LatLngExpression, LeafletMouseEvent, Map } from "leaflet";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

import { PositionContext } from "../../../contexts/PositionContext";

import styles from './MapForm.module.scss';

type MapFormProps = {
  selectedPosition: LatLngExpression;
  handleSelectPosition: (event: LeafletMouseEvent) => void;
}

export default function MapForm({ selectedPosition, handleSelectPosition }: MapFormProps) {
  const [map, setMap] = useState<Map | null>(null);

  const { position } = useContext(PositionContext);

  useEffect(() => {
    if (map) {
      map.addEventListener('click', handleSelectPosition);
      map.flyTo(position, 15, { duration: 0 });
    }
  }, [map, handleSelectPosition, position])

  return (
    <div className={styles.mapFormContainer}>
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        whenCreated={map => setMap(map)}
        className={styles.mapContainer}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={selectedPosition} />
      </MapContainer>
    </div>

  )
}
