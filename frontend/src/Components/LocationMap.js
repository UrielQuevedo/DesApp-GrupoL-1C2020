import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import React, { useRef, useState } from 'react';

const LocationMap = ({ currentCoords, setCurrentCoords }) => {
  const refMarker = useRef();
  const [actualCoords, setActualCoords] = useState({ lat: currentCoords.latitude, lng: currentCoords.longitude });

  const handlerUpdatePosition = () => {
    const marker = refMarker.current;
    if (marker != null) {
      const coords = marker.leafletElement.getLatLng();
      setCurrentCoords({ latitude: coords.lat, longitude: coords.lng });
      setActualCoords(coords);
    };
  }

  return (
    <Map center={actualCoords} zoom={16}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        position={actualCoords}
        draggable={true}
        ondragend={handlerUpdatePosition}
        ref={refMarker}
      >
        <Popup minWidth={90}>
          <span>
            TU UBICACION
          </span>
        </Popup>
      </Marker>
    </Map>
  );
}

export default LocationMap;