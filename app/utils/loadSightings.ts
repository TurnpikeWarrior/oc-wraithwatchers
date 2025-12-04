import Papa from 'papaparse';
import { Sighting } from '../types/sighting';

export async function loadSightings(): Promise<Sighting[]> {
  const response = await fetch('/data/ghost_sightings_12000_with_images.csv');
  const csvText = await response.text();
  
  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const sightings: Sighting[] = results.data.map((row: any) => ({
          date: row['Date of Sighting'],
          latitude: parseFloat(row['Latitude of Sighting']),
          longitude: parseFloat(row['Longitude of Sighting']),
          city: row['Nearest Approximate City'],
          state: row['US State'],
          notes: row['Notes about the sighting'],
          timeOfDay: row['Time of Day'],
          tag: row['Tag of Apparition'],
          imageUrl: row['Image Link'] || '',
        }));
        resolve(sightings);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
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

