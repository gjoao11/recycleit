import { LatLngExpression, Map } from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';
import Image from 'next/image';

import styles from './MapWrapper.module.scss';
import { TextButton } from '../TextButton';
import { useRouter } from 'next/router';

type Point = {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  image: string;
}

type MapProps = {
  position: LatLngExpression;
  points: Point[];
}

export default function MapWrapper({ position, points }: MapProps) {
  const router = useRouter();

  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (map) {
      map.removeControl(map.zoomControl);
    }
  }, [map]);

  useEffect(() => {
    if (map) {
      map.flyTo(position, 14, { duration: 0 })
    }
  }, [map, position])

  return (
    <MapContainer
      center={position}
      zoom={14}
      scrollWheelZoom={false}
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
            <Popup minWidth={244} maxWidth={244}>
              <div className={styles.pointPopup}>
                <span className={styles.pointName}>{point.name}</span>

                <div className={styles.popupImage}>
                  {point.image !== 'http://localhost:3333/uploads/undefined' ? (
                    <Image src={point.image} alt={point.name} layout="fill" />
                  ) : (
                    <span className={styles.noImage}>Sem imagem</span>
                  )}
                </div>

                <div className={styles.popupButton}>
                  <TextButton onClick={() => router.push(`/points/${point.id}`)}>
                    ver detalhes
                  </TextButton>
                </div>
              </div>
            </Popup>
          </Marker>
        ))
      }
    </MapContainer>
  )
}
