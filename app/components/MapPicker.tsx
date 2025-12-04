'use client';

import { useState, useCallback } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapPickerProps {
  onLocationSelect: (lat: number, lng: number) => void;
  selectedPosition: [number, number] | null;
}

export default function MapPicker({ onLocationSelect, selectedPosition }: MapPickerProps) {
  // Center of US
  const initialViewState = {
    longitude: -98.5795,
    latitude: 39.8283,
    zoom: 4
  };

  // Mapbox public token
  const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example';

  const handleMapClick = useCallback((event: any) => {
    const { lng, lat } = event.lngLat;
    onLocationSelect(lat, lng);
  }, [onLocationSelect]);

  return (
    <div style={{ height: '400px', width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
      <Map
        initialViewState={initialViewState}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        onClick={handleMapClick}
      >
        <NavigationControl position="top-right" />
        
        {selectedPosition && (
          <Marker
            longitude={selectedPosition[1]}
            latitude={selectedPosition[0]}
            anchor="bottom"
          >
            <div className="cursor-pointer">
              <img
                src="/ghostmapicon.png"
                alt="Selected location"
                style={{ width: '40px', height: '40px' }}
              />
            </div>
          </Marker>
        )}
      </Map>
    </div>
  );
}
