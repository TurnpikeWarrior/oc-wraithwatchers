import { Sighting } from '../types/sighting';
import { supabase } from './supabase';

export async function loadSightings(): Promise<Sighting[]> {
  try {
    console.log('Attempting to load sightings from Supabase...');
    
    const { data, error } = await supabase
      .from('ghost_sightings')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('Error loading sightings from Supabase:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      
      // Return empty array instead of throwing to prevent app crash
      console.warn('Returning empty array due to error. Make sure the ghost_sightings table exists in Supabase.');
      return [];
    }

    console.log(`Successfully loaded ${data?.length || 0} sightings from Supabase`);

    // Map database columns to the Sighting interface
    const sightings: Sighting[] = (data || []).map((row: any) => ({
      date: row.date,
      latitude: row.latitude,
      longitude: row.longitude,
      city: row.city,
      state: row.state,
      notes: row.notes,
      timeOfDay: row.time_of_day,
      tag: row.tag,
      imageUrl: row.image_url || '',
    }));

    return sightings;
  } catch (error) {
    console.error('Unexpected error loading sightings:', error);
    return [];
  }
}

export function getRecentSighting(sightings: Sighting[]): string {
  if (sightings.length === 0) return 'No sightings';
  
  const sortedByDate = [...sightings].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  const mostRecent = sortedByDate[0];
  const daysDiff = Math.floor(
    (new Date().getTime() - new Date(mostRecent.date).getTime()) / (1000 * 60 * 60 * 24)
  );
  
  if (daysDiff === 0) return 'Today';
  if (daysDiff === 1) return '1 Day Ago';
  return `${daysDiff} Days Ago`;
}

export function getRecentSightingLocation(sightings: Sighting[]): string {
  if (sightings.length === 0) return 'No sightings';
  
  const sortedByDate = [...sightings].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  const mostRecent = sortedByDate[0];
  return `${mostRecent.city}, ${mostRecent.state}`;
}

export function getMostGhostlyCity(sightings: Sighting[]): string {
  if (sightings.length === 0) return 'No data';
  
  const cityCounts: Record<string, number> = {};
  
  sightings.forEach(sighting => {
    const key = `${sighting.city}, ${sighting.state}`;
    cityCounts[key] = (cityCounts[key] || 0) + 1;
  });
  
  const sortedCities = Object.entries(cityCounts).sort((a, b) => b[1] - a[1]);
  return sortedCities[0][0];
}

