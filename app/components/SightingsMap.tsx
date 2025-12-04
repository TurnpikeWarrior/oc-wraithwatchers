'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Sighting } from '../types/sighting';
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

interface SightingsMapProps {
  sightings: Sighting[];
  height?: string;
}

export default function SightingsMap({ sightings, height = "600px" }: SightingsMapProps) {
  // Center of US
  const center: [number, number] = [39.8283, -98.5795];
  
  return (
    <div style={{ height, width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
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
        {sightings.map((sighting, idx) => (
          <Marker
            key={idx}
            position={[sighting.latitude, sighting.longitude]}
            icon={icon}
          >
            <Popup maxWidth={300}>
              <div className="p-2">
                {sighting.imageUrl && (
                  <img
                    src={sighting.imageUrl}
                    alt="Ghost sighting"
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                )}
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold text-[#FF9F40]">Date of Sighting:</span>
                    <p className="text-sm">{sighting.date}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-[#FF9F40]">Time of Sighting:</span>
                    <p className="text-sm">{sighting.timeOfDay}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-[#FF9F40]">Type of Sighting:</span>
                    <p className="text-sm">{sighting.tag}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-[#FF9F40]">Sighting Notes:</span>
                    <p className="text-sm">{sighting.notes}</p>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

