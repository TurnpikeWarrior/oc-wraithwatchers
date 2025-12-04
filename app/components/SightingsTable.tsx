'use client';

import { useState, useMemo } from 'react';
import { Sighting } from '../types/sighting';

interface SightingsTableProps {
  sightings: Sighting[];
}

type SortField = 'date' | 'city' | 'state' | 'timeOfDay' | 'tag';
type SortDirection = 'asc' | 'desc';

export default function SightingsTable({ sightings }: SightingsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField | null>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const itemsPerPage = 20;
  
  // Sort sightings based on current sort field and direction
  const sortedSightings = useMemo(() => {
    if (!sortField) return sightings;
    
    const sorted = [...sightings].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      // Handle date sorting
      if (sortField === 'date') {
        aVal = new Date(aVal as string).getTime();
        bVal = new Date(bVal as string).getTime();
      }
      
      // String comparison
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      
      // Numeric comparison
      return sortDirection === 'asc' 
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });
    
    return sorted;
  }, [sightings, sortField, sortDirection]);
  
  const totalPages = Math.ceil(sortedSightings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSightings = sortedSightings.slice(startIndex, endIndex);
  
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1); // Reset to first page when sorting
  };
  
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <span className="text-zinc-500 ml-1">⇅</span>;
    }
    return sortDirection === 'asc' 
      ? <span className="ml-1">↑</span>
      : <span className="ml-1">↓</span>;
  };

  const handleExport = () => {
    // Create CSV content
    const headers = ['Date', 'City', 'State', 'Time of Day', 'Type', 'Notes', 'Latitude', 'Longitude'];
    const csvContent = [
      headers.join(','),
      ...sortedSightings.map(s => [
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
                <th 
                  className="px-4 py-3 text-left text-sm font-semibold text-[#FF9F40] cursor-pointer hover:bg-zinc-700 transition-colors select-none"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center">
                    Date{getSortIcon('date')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-semibold text-[#FF9F40] cursor-pointer hover:bg-zinc-700 transition-colors select-none"
                  onClick={() => handleSort('city')}
                >
                  <div className="flex items-center">
                    City{getSortIcon('city')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-semibold text-[#FF9F40] cursor-pointer hover:bg-zinc-700 transition-colors select-none"
                  onClick={() => handleSort('state')}
                >
                  <div className="flex items-center">
                    State{getSortIcon('state')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-semibold text-[#FF9F40] cursor-pointer hover:bg-zinc-700 transition-colors select-none"
                  onClick={() => handleSort('timeOfDay')}
                >
                  <div className="flex items-center">
                    Time{getSortIcon('timeOfDay')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-semibold text-[#FF9F40] cursor-pointer hover:bg-zinc-700 transition-colors select-none"
                  onClick={() => handleSort('tag')}
                >
                  <div className="flex items-center">
                    Type{getSortIcon('tag')}
                  </div>
                </th>
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

