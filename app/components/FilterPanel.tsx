'use client';

import { useState } from 'react';
import { TimeOfDay, ApparitionTag } from '../types/sighting';

interface FilterPanelProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  state: string;
  timeOfDay: string;
  tag: string;
  startDate: string;
  endDate: string;
}

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming'
];

const TIMES_OF_DAY: TimeOfDay[] = ['Morning', 'Afternoon', 'Evening', 'Night', 'Dawn', 'Midnight'];

const APPARITION_TAGS: ApparitionTag[] = [
  'Headless Spirit',
  'Poltergeist',
  'Orbs',
  'Shadow Figure',
  'White Lady',
  'Phantom Sounds',
  'Cold Spot',
  'Full-Body Apparition'
];

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    state: '',
    timeOfDay: '',
    tag: '',
    startDate: '',
    endDate: '',
  });

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const emptyFilters: FilterOptions = {
      state: '',
      timeOfDay: '',
      tag: '',
      startDate: '',
      endDate: '',
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-[#F8F8F8]">Filter Control Panel</h3>
        <button
          onClick={resetFilters}
          className="text-sm px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-[#F8F8F8] rounded-lg transition-colors"
        >
          Reset Filters
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">State</label>
          <select
            value={filters.state}
            onChange={(e) => handleFilterChange('state', e.target.value)}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-[#F8F8F8] focus:outline-none focus:ring-2 focus:ring-[#FF9F40]"
          >
            <option value="">All States</option>
            {US_STATES.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Time of Day</label>
          <select
            value={filters.timeOfDay}
            onChange={(e) => handleFilterChange('timeOfDay', e.target.value)}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-[#F8F8F8] focus:outline-none focus:ring-2 focus:ring-[#FF9F40]"
          >
            <option value="">All Times</option>
            {TIMES_OF_DAY.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Apparition Type</label>
          <select
            value={filters.tag}
            onChange={(e) => handleFilterChange('tag', e.target.value)}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-[#F8F8F8] focus:outline-none focus:ring-2 focus:ring-[#FF9F40]"
          >
            <option value="">All Types</option>
            {APPARITION_TAGS.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Start Date</label>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => handleFilterChange('startDate', e.target.value)}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-[#F8F8F8] focus:outline-none focus:ring-2 focus:ring-[#FF9F40]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">End Date</label>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => handleFilterChange('endDate', e.target.value)}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-[#F8F8F8] focus:outline-none focus:ring-2 focus:ring-[#FF9F40]"
          />
        </div>
      </div>
    </div>
  );
}

