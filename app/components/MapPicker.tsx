'use client';

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapPickerProps {
  onLocationSelect: (lat: number, lng: number) => void;
  selectedPosition: [number, number] | null;
}

function LocationMarker({ onLocationSelect, selectedPosition }: MapPickerProps) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return selectedPosition ? (
    <Marker position={selectedPosition} icon={icon} />
  ) : null;
}

export default function MapPicker({ onLocationSelect, selectedPosition }: MapPickerProps) {
  // Center of US
  const center: [number, number] = [39.8283, -98.5795];
  
  return (
    <div style={{ height: '400px', width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
      <MapContainer
        center={center}
        zoom={4}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker 
          onLocationSelect={onLocationSelect}
          selectedPosition={selectedPosition}
        />
      </MapContainer>
    </div>
  );
}

