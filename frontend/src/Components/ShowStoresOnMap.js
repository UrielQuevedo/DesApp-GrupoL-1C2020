import React from 'react';
import L from 'leaflet';
import { Map, TileLayer, Popup, Marker } from 'react-leaflet';

const ShowStoreOnMap = ({ userLocation, stores, centerLocation }) => {

  const userLocationIcon = new L.Icon({
    iconUrl: '/svg/ubicacion.svg',
    iconRetinaUrl: '/svg/ubicacion.svg',
    iconSize: [35, 35],
  });

  const storeLocationIcon = new L.Icon({
    iconUrl: '/svg/tienda.svg',
    iconRetinaUrl: '/svg/tienda.svg',
    iconSize: [35, 35],
  });

  return (
    <Map center={[ centerLocation.latitude, centerLocation.longitude ]} zoom={16} style={{ height:'440px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
        <Marker icon={userLocationIcon} position={[ userLocation.latitude, userLocation.longitude ]}>
          <Popup minWidth={90}>
            <span>
              Tu Ubicacion
            </span>
          </Popup>
        </Marker>
      {
        stores.map(({ name, sector, location }, i) => (
          <Marker icon={storeLocationIcon} key={i} position={[location.latitude, location.longitude]} >
            <Popup minWidth={90}>
              <span>
                {name + " (" + sector + ")"}
              </span>
            </Popup>
          </Marker>
        ))
      }
    </Map>
  );
}

export default ShowStoreOnMap;