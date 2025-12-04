'use client';

import { useState, useRef } from 'react';
import Map, { Marker, Popup, NavigationControl, FullscreenControl } from 'react-map-gl';
import { Sighting } from '../types/sighting';
import 'mapbox-gl/dist/mapbox-gl.css';

interface SightingsMapProps {
  sightings: Sighting[];
  height?: string;
}

export default function SightingsMap({ sightings, height = "600px" }: SightingsMapProps) {
  const [popupInfo, setPopupInfo] = useState<Sighting | null>(null);
  const mapRef = useRef<any>(null);

  // Center of US
  const initialViewState = {
    longitude: -98.5795,
    latitude: 39.8283,
    zoom: 4
  };

  // Mapbox public token - you'll need to replace this with your own token
  const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example';

  return (
    <div style={{ height, width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
      <Map
        ref={mapRef}
        initialViewState={initialViewState}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/rasagy/cj8s4e9ij15ad2rp8s5ddj0ey"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {/* Map Controls */}
        <NavigationControl position="top-right" />
        <FullscreenControl position="top-right" />

        {/* Markers for each sighting */}
        {sightings.map((sighting, idx) => (
          <Marker
            key={idx}
            longitude={sighting.longitude}
            latitude={sighting.latitude}
            anchor="bottom"
            onClick={e => {
              e.originalEvent.stopPropagation();
              setPopupInfo(sighting);
            }}
          >
            <div className="cursor-pointer hover:scale-110 transition-transform">
              <img
                src="/ghostmapicon.png"
                alt="Ghost sighting"
                style={{ width: '40px', height: '40px' }}
              />
            </div>
          </Marker>
        ))}

        {/* Popup */}
        {popupInfo && (
          <Popup
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            anchor="top"
            onClose={() => setPopupInfo(null)}
            closeOnClick={false}
            maxWidth="300px"
          >
            <div className="p-3">
              {popupInfo.imageUrl && (
                <img
                  src={popupInfo.imageUrl}
                  alt="Ghost sighting"
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
              )}
              <div className="space-y-2">
                <div>
                  <span className="font-bold text-black">Date of Sighting:</span>
                  <p className="text-sm text-gray-800">{popupInfo.date}</p>
                </div>
                <div>
                  <span className="font-bold text-black">Time of Sighting:</span>
                  <p className="text-sm text-gray-800">{popupInfo.timeOfDay}</p>
                </div>
                <div>
                  <span className="font-bold text-black">Type of Sighting:</span>
                  <p className="text-sm text-gray-800">{popupInfo.tag}</p>
                </div>
                <div>
                  <span className="font-bold text-black">Sighting Notes:</span>
                  <p className="text-sm text-gray-800">{popupInfo.notes}</p>
                </div>
              </div>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
