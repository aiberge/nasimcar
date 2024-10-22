import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Image from 'next/image'

interface MapProps {
  selectedLocation: string | null;
}

const locations: { [key: string]: [number, number] } = {
  'SOUL.CAR': [34.67256186777404, -1.8913967853817935],
}

function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const CustomMarker: React.FC<{ position: [number, number]; name: string; icon: L.Icon }> = ({ position, name, icon }) => {
  return (
    <Marker position={position} icon={icon}>
      <Popup>
        <div style={{ textAlign: 'center' }}>
          <strong>SOUL.CAR {name}</strong>
        </div>
      </Popup>
    </Marker>
  )
}

const Map: React.FC<MapProps> = ({ selectedLocation }) => {
  const center: [number, number] = [34.672716389260486, -1.8913117004934976] 
  const zoom = 25 // Default zoom level

  const defaultIcon = L.icon({
    iconUrl: '/logocar.png',
    iconSize: [100, 116],
    iconAnchor: [22, 61],
    popupAnchor: [0, -61],
  })

  const selectedIcon = L.icon({
    iconUrl: '/logocar.png',
    iconSize: [15, 37],
    iconAnchor: [17, 57],
    popupAnchor: [0, -57],
  })

  const selectedCenter = selectedLocation ? locations[selectedLocation] : center

  return (
    <div className="relative w-full h-[400px]">
      <Image
        src="/carens_lrg.jpg"
        alt="Map of SOUL.CAR"
        fill
        style={{ objectFit: 'cover' }}
      />
      <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
        <ChangeView center={selectedCenter} zoom={selectedLocation ? 15 : zoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {Object.entries(locations).map(([name, position]) => (
          <CustomMarker 
            key={name} 
            position={position} 
            name={name}
            icon={selectedLocation === name ? selectedIcon : defaultIcon}
          />
        ))}
      </MapContainer>
    </div>
  )
}

export default Map
