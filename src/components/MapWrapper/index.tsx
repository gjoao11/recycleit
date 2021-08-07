import { LatLngExpression, Map } from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from "react-leaflet"

import styles from './MapWrapper.module.scss';

type Point = {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
}

type MapProps = {
  position: LatLngExpression;
  points: Point[];
}

export default function MapWrapper({ position, points }: MapProps) {
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (map) {
      map.removeControl(map.zoomControl);
    }
  }, [map])

  return (
    <MapContainer
      center={position}
      zoom={15}
      scrollWheelZoom
      whenCreated={map => setMap(map)}
      className={styles.mapContainer}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomleft" />
      {
        points.map(point => (
          <Marker
            key={point.id}
            position={[Number(point.latitude), Number(point.longitude)]}
          >
            <Popup>
              {point.name}
            </Popup>
          </Marker>
        ))
      }
    </MapContainer>
  )
}
