'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

// Dynamic import to avoid SSR issues with Leaflet
const MapPicker = dynamic(() => import('../components/MapPicker'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] bg-zinc-900 rounded-xl flex items-center justify-center">
      <p className="text-zinc-400">Loading map...</p>
    </div>
  ),
});

const TIMES_OF_DAY = ['Morning', 'Afternoon', 'Evening', 'Night', 'Dawn', 'Midnight'];
const APPARITION_TAGS = [
  'Headless Spirit',
  'Poltergeist',
  'Orbs',
  'Shadow Figure',
  'White Lady',
  'Phantom Sounds',
  'Cold Spot',
  'Full-Body Apparition'
];

export default function PostSighting() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    type: '',
    notes: '',
  });
  const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.date || !formData.time || !formData.type || !formData.notes || !selectedPosition) {
      alert('Please fill in all fields and select a location on the map.');
      return;
    }

    // In a real app, we would save this data
    // For now, just redirect to thank you page
    router.push('/thank-you');
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setSelectedPosition([lat, lng]);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#F8F8F8] mb-4">Post a Sighting</h1>
        <p className="text-lg text-zinc-400">
          Did you spot a spirit? Post information below so that our community<br />
          can stand vigilant!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date of Sighting */}
        <div>
          <label className="block text-lg font-medium text-[#F8F8F8] mb-2">
            Date of Sighting
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-4 py-3 bg-transparent border-2 border-zinc-700 rounded-xl text-[#F8F8F8] focus:outline-none focus:border-[#FF9F40] transition-colors"
            required
          />
        </div>

        {/* Time of Sighting */}
        <div>
          <label className="block text-lg font-medium text-[#F8F8F8] mb-2">
            Time of Sighting
          </label>
          <input
            type="text"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            placeholder="e.g., 10:15PM PM EST"
            className="w-full px-4 py-3 bg-transparent border-2 border-zinc-700 rounded-xl text-[#F8F8F8] placeholder-zinc-600 focus:outline-none focus:border-[#FF9F40] transition-colors"
            required
          />
        </div>

        {/* Type of Sighting */}
        <div>
          <label className="block text-lg font-medium text-[#F8F8F8] mb-2">
            Type of Sighting
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full px-4 py-3 bg-transparent border-2 border-zinc-700 rounded-xl text-[#F8F8F8] focus:outline-none focus:border-[#FF9F40] transition-colors"
            required
          >
            <option value="" className="bg-zinc-900">Select a type...</option>
            {APPARITION_TAGS.map(tag => (
              <option key={tag} value={tag} className="bg-zinc-900">{tag}</option>
            ))}
          </select>
        </div>

        {/* Sighting Notes */}
        <div>
          <label className="block text-lg font-medium text-[#F8F8F8] mb-2">
            Sighting Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 bg-transparent border-2 border-zinc-700 rounded-xl text-[#F8F8F8] placeholder-zinc-600 focus:outline-none focus:border-[#FF9F40] transition-colors resize-none"
            required
          />
        </div>

        {/* Map Picker */}
        <div>
          <label className="block text-lg font-medium text-[#F8F8F8] mb-2">
            Where Were You Exactly? (Place a Pin)
          </label>
          <MapPicker 
            onLocationSelect={handleLocationSelect}
            selectedPosition={selectedPosition}
          />
          {selectedPosition && (
            <p className="mt-2 text-sm text-zinc-400">
              Selected location: {selectedPosition[0].toFixed(4)}, {selectedPosition[1].toFixed(4)}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 bg-black border-2 border-white text-white text-xl font-bold rounded-xl hover:bg-white hover:text-black transition-all"
        >
          Post Your Sighting
        </button>
      </form>
    </div>
  );
}

