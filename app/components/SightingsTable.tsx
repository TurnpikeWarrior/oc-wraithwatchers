'use client';

import { useState } from 'react';
import { Sighting } from '../types/sighting';

interface SightingsTableProps {
  sightings: Sighting[];
}

export default function SightingsTable({ sightings }: SightingsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  
  const totalPages = Math.ceil(sightings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSightings = sightings.slice(startIndex, endIndex);

  const handleExport = () => {
    // Create CSV content
    const headers = ['Date', 'City', 'State', 'Time of Day', 'Type', 'Notes', 'Latitude', 'Longitude'];
    const csvContent = [
      headers.join(','),
      ...sightings.map(s => [
        s.date,
        s.city,
        s.state,
        s.timeOfDay,
        s.tag,
        `"${s.notes.replace(/"/g, '""')}"`,
        s.latitude,
        s.longitude
      ].join(','))
    ].join('\n');

    // Download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ghost_sightings.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#F8F8F8]">Sightings Table</h2>
        <button
          onClick={handleExport}
          className="px-6 py-2 bg-[#FF9F40] hover:bg-[#ffb366] text-black font-medium rounded-lg transition-colors"
        >
          Export Data
        </button>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-800">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#FF9F40]">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#FF9F40]">City</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#FF9F40]">State</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#FF9F40]">Time</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#FF9F40]">Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#FF9F40]">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {currentSightings.map((sighting, idx) => (
                <tr key={idx} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="px-4 py-3 text-sm text-[#F8F8F8]">{sighting.date}</td>
                  <td className="px-4 py-3 text-sm text-[#F8F8F8]">{sighting.city}</td>
                  <td className="px-4 py-3 text-sm text-[#F8F8F8]">{sighting.state}</td>
                  <td className="px-4 py-3 text-sm text-[#F8F8F8]">{sighting.timeOfDay}</td>
                  <td className="px-4 py-3 text-sm text-[#F8F8F8]">{sighting.tag}</td>
                  <td className="px-4 py-3 text-sm text-zinc-400 max-w-md truncate">{sighting.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed text-[#F8F8F8] rounded-lg transition-colors"
          >
            Previous
          </button>
          <span className="text-[#F8F8F8] px-4">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed text-[#F8F8F8] rounded-lg transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

