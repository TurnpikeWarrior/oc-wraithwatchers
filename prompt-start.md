# WraithWatches  

## Overview  
We are building a Next.js application for displaying ghost sightings across the United States. The name of the application is WraithWatchers. This is intended to be a fun project that takes synthetic data about ghost sightings and displays them on a map and table. It also allow you to add new sightings. 


## Initial Instructions  
- I want you to play the role of expert full-stack developer. 
- I will be supplying you with an intial prompt filled with lots of information about the application. 
- Your first task will be to review the instructions and confirm that you understand the context. 
- Do not write any code just yet. 
- I will be supplying you with the first step. 

## Functionality  
- Refer to the mockups that I am supplying. 
- The basic functionality of the application is composed of three different pages. 
- Page 1: Sightings Maps and Table
-- This page includes a few stats on sightings. It includes the total number of sightings. It includes the most recent sighting. It includes the city with the most frequent sightings. 
-- This page also includes a map with markers specifying each of the sightings. When you click the marker you see a pop-up that shows more information about the sighting. It also includes an image of the sighting if one exists. 
-- This page also includes a table of all the sightings available
- This page also includes a filter system that allows you to look for sightings that have a particular set of characteristics. 

- Page 2: Entry Form
-- This page allows users to create new sightings. 
-- It provides an interface to include the various form fields and a map where the user can click and select the location of the sighting. 

-Page 3: Confirmation Form
-- This page appears after the user has entered a sighting. 

## Visual Identity  
-- Use the below contents included in <visual-identity> as a reference for the visual identity of the application. 
    <visual-identity>
Core Aesthetic: Minimalist, playful-yet-mysterious, blending modern flat design with retro-inspired halftones and bold contrast.
Color Scheme:
Primary: Deep black (#000000) for backgrounds.
Secondary: Soft ivory/ghost white (#F8F8F8) for main ghost figures.
Accent: Subtle warm hues like faded orange (#FF9F40) or muted gray tones (#6E6E6E) for depth.
Optional: Gradient halftone textures to suggest “fading into the unseen.”
Visual Style:
Flat and clean vector shapes with rounded edges.
Occasional halftone or stippled shading for texture.
Simple silhouettes with large eye cutouts for personality.
Minimal detail—shapes do the storytelling.
Play with symmetry/asymmetry for quirky character.
Tone:
Mysterious but not scary.
Quirky and approachable, with a hint of dark whimsy.
Balances between “serious map tool” and “fun folklore project.”
Typography:
Sans-serif, slightly condensed, geometric (e.g., Inter, Space Grotesk).
High contrast against dark backgrounds.
Iconography & Imagery:
Ghosts as rounded, flowing, slightly drippy or floating shapes.
Occasional playful illustrations (ghost sipping coffee, peeking, drifting).
Logos or marks that merge letters and ghost silhouettes (e.g., "G" integrated into a ghost).
Layout & Feel:
Dark backgrounds with floating white/ivory ghost elements.
Sparse use of accent color for buttons, map markers, or hover states.
Clean grid, lots of negative space.
Subtle animations: fade-ins, drifts, slight wiggles (evoking ghostly movement).  
</visual-identity>

## Coding Style  
-- Use Next.js and Tailwind. 
-- Use Leaflet for the map. Consider if you need to find a React specific implementation of Leaflet for this to work. 

## Data 
-- Refer to the data file that I have provided in context. 
-- This provides you with the schema for the kinds of data fields we will be providing. 