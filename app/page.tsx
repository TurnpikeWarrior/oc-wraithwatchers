'use client';

import { useEffect, useState } from 'react';
import { Sighting } from './types/sighting';
import { loadSightings, getRecentSighting, getRecentSightingLocation, getMostGhostlyCity } from './utils/loadSightings';
import FilterPanel, { FilterOptions } from './components/FilterPanel';
import SightingsTable from './components/SightingsTable';
import SightingsMap from './components/SightingsMap';

export default function Home() {
  const [allSightings, setAllSightings] = useState<Sighting[]>([]);
  const [filteredSightings, setFilteredSightings] = useState<Sighting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSightings()
      .then(data => {
        setAllSightings(data);
        setFilteredSightings(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading sightings:', error);
        setLoading(false);
      });
  }, []);

  const handleFilterChange = (filters: FilterOptions) => {
    let filtered = [...allSightings];

    if (filters.state) {
      filtered = filtered.filter(s => s.state === filters.state);
    }

    if (filters.timeOfDay) {
      filtered = filtered.filter(s => s.timeOfDay === filters.timeOfDay);
    }

    if (filters.tag) {
      filtered = filtered.filter(s => s.tag === filters.tag);
    }

    if (filters.startDate) {
      filtered = filtered.filter(s => new Date(s.date) >= new Date(filters.startDate));
    }

    if (filters.endDate) {
      filtered = filtered.filter(s => new Date(s.date) <= new Date(filters.endDate));
    }

    setFilteredSightings(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">👻</div>
          <p className="text-xl text-zinc-400">Loading sightings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Stats Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center text-[#F8F8F8] mb-8">Sightings Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-zinc-900 border-2 border-zinc-700 rounded-xl p-8 text-center">
            <h3 className="text-lg font-medium text-zinc-400 mb-2">Total Sightings:</h3>
            <p className="text-4xl font-bold text-[#F8F8F8]">{allSightings.length.toLocaleString()}</p>
          </div>
          <div className="bg-zinc-900 border-2 border-zinc-700 rounded-xl p-8 text-center">
            <h3 className="text-lg font-medium text-zinc-400 mb-2">Most Recent Sighting:</h3>
            <p className="text-4xl font-bold text-[#F8F8F8]">{getRecentSighting(allSightings)}</p>
          </div>
          <div className="bg-zinc-900 border-2 border-zinc-700 rounded-xl p-8 text-center">
            <h3 className="text-lg font-medium text-zinc-400 mb-2">Most Recent Location:</h3>
            <p className="text-2xl font-bold text-[#F8F8F8]">{getRecentSightingLocation(allSightings)}</p>
          </div>
          <div className="bg-zinc-900 border-2 border-zinc-700 rounded-xl p-8 text-center">
            <h3 className="text-lg font-medium text-zinc-400 mb-2">Most Ghostly City:</h3>
            <p className="text-2xl font-bold text-[#F8F8F8]">{getMostGhostlyCity(allSightings)}</p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center text-[#F8F8F8] mb-8">Sightings Map</h2>
        <SightingsMap sightings={filteredSightings} />
      </section>

      {/* Filter Panel */}
      <section className="mb-12">
        <FilterPanel onFilterChange={handleFilterChange} />
      </section>

      {/* Table Section */}
      <section className="mb-12">
        <SightingsTable sightings={filteredSightings} />
      </section>
    </div>
  );
}
