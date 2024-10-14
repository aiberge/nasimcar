import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface MapProps {
  selectedLocation: string | null;
}

const locations: { [key: string]: [number, number] } = {
  'Oujda': [34.67559288144534, -1.8712196431600692],
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
          <strong>Nassim Car {name}</strong>
        </div>
      </Popup>
    </Marker>
  )
}

const Map: React.FC<MapProps> = ({ selectedLocation }) => {
  const center: [number, number] = [34.67559288144534, -1.8712196431600692] 
  const zoom = 25 // Default zoom level

  const defaultIcon = L.icon({
    iconUrl: '/image.png',
    iconSize: [100, 116],
    iconAnchor: [22, 61],
    popupAnchor: [0, -61],
  })

  const selectedIcon = L.icon({
    iconUrl: '/selected-marker.png',
    iconSize: [35, 57],
    iconAnchor: [17, 57],
    popupAnchor: [0, -57],
  })

  const selectedCenter = selectedLocation ? locations[selectedLocation] : center

  return (
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
  )
}

export default Map
