export interface Sighting {
  date: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  notes: string;
  timeOfDay: string;
  tag: string;
  imageUrl: string;
}

export type TimeOfDay = "Morning" | "Afternoon" | "Evening" | "Night" | "Dawn" | "Midnight";

export type ApparitionTag = 
  | "Headless Spirit"
  | "Poltergeist"
  | "Orbs"
  | "Shadow Figure"
  | "White Lady"
  | "Phantom Sounds"
  | "Cold Spot"
  | "Full-Body Apparition";


