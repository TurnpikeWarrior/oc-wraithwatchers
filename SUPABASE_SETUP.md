# Supabase Setup Guide

## 1. Environment Variables

Make sure your `.env.local` file contains the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```

You can find these values in your Supabase project dashboard:
- Go to: Project Settings > API
- Copy the "Project URL" and "anon/public" key

## 2. Database Schema

Create a table called `ghost_sightings` in your Supabase database with the following schema:

### SQL to Create Table

```sql
CREATE TABLE ghost_sightings (
  id BIGSERIAL PRIMARY KEY,
  date DATE NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  city TEXT DEFAULT 'Unknown',
  state TEXT DEFAULT 'Unknown',
  notes TEXT NOT NULL,
  time_of_day TEXT NOT NULL,
  tag TEXT NOT NULL,
  image_url TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX idx_ghost_sightings_date ON ghost_sightings(date DESC);
CREATE INDEX idx_ghost_sightings_state ON ghost_sightings(state);
CREATE INDEX idx_ghost_sightings_city ON ghost_sightings(city);
CREATE INDEX idx_ghost_sightings_tag ON ghost_sightings(tag);
CREATE INDEX idx_ghost_sightings_time_of_day ON ghost_sightings(time_of_day);

-- Enable Row Level Security (RLS)
ALTER TABLE ghost_sightings ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
-- Allow anyone to read sightings
CREATE POLICY "Allow public read access" 
  ON ghost_sightings 
  FOR SELECT 
  USING (true);

-- Allow anyone to insert sightings
CREATE POLICY "Allow public insert access" 
  ON ghost_sightings 
  FOR INSERT 
  WITH CHECK (true);
```

### Column Details

| Column | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL | Auto-incrementing primary key |
| date | DATE | Date of the sighting |
| latitude | DOUBLE PRECISION | Latitude coordinate |
| longitude | DOUBLE PRECISION | Longitude coordinate |
| city | TEXT | Nearest city |
| state | TEXT | US State |
| notes | TEXT | Description of the sighting |
| time_of_day | TEXT | Time of day (Morning, Afternoon, Evening, Night, Dawn, Midnight) |
| tag | TEXT | Type of apparition (Headless Spirit, Poltergeist, Orbs, etc.) |
| image_url | TEXT | URL to an image of the sighting |
| created_at | TIMESTAMP | When the record was created |

## 3. Import Existing CSV Data (Optional)

If you want to import your existing CSV data into Supabase:

### Option A: Using Supabase Dashboard

1. Go to your Supabase project
2. Navigate to: Table Editor > ghost_sightings
3. Click "Insert" > "Import data from CSV"
4. Upload your CSV file: `public/data/ghost_sightings_12000_with_images.csv`
5. Map the CSV columns to your database columns:
   - `Date of Sighting` → `date`
   - `Latitude of Sighting` → `latitude`
   - `Longitude of Sighting` → `longitude`
   - `Nearest Approximate City` → `city`
   - `US State` → `state`
   - `Notes about the sighting` → `notes`
   - `Time of Day` → `time_of_day`
   - `Tag of Apparition` → `tag`
   - `Image Link` → `image_url`

### Option B: Using SQL

You can also use a migration script. Create a file `import_csv.sql` with:

```sql
-- First, create a temporary table for CSV import
CREATE TEMP TABLE temp_sightings (
  date_of_sighting TEXT,
  latitude_of_sighting TEXT,
  longitude_of_sighting TEXT,
  nearest_approximate_city TEXT,
  us_state TEXT,
  notes_about_the_sighting TEXT,
  time_of_day TEXT,
  tag_of_apparition TEXT,
  image_link TEXT
);

-- Import CSV (you'll need to use Supabase's CSV import feature for this)
-- Then insert into main table:
INSERT INTO ghost_sightings (date, latitude, longitude, city, state, notes, time_of_day, tag, image_url)
SELECT 
  date_of_sighting::DATE,
  latitude_of_sighting::DOUBLE PRECISION,
  longitude_of_sighting::DOUBLE PRECISION,
  COALESCE(nearest_approximate_city, 'Unknown'),
  COALESCE(us_state, 'Unknown'),
  notes_about_the_sighting,
  time_of_day,
  tag_of_apparition,
  COALESCE(image_link, '')
FROM temp_sightings;
```

## 4. Test the Connection

After setup, restart your development server:

```bash
npm run dev
```

Visit your app and:
1. Check if existing sightings load (if you imported data)
2. Try posting a new sighting via the `/post` page
3. Verify it appears in your Supabase dashboard and on the map

## 5. Troubleshooting

### "Missing Supabase environment variables" error
- Double-check your `.env.local` file exists in the root directory
- Make sure variable names are exactly: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Restart your development server after adding environment variables

### Data not loading
- Check Supabase dashboard for any errors
- Verify RLS policies are enabled and allow public access
- Check browser console for error messages

### Can't insert new sightings
- Verify the RLS policy for INSERT is enabled
- Check that all required fields are being sent from the form
- Look at Network tab in browser dev tools to see the API response

## 6. Security Considerations

The current setup allows anyone to read and insert data (suitable for a public ghost sighting app). If you need to restrict access:

1. **Require authentication**: Implement Supabase Auth
2. **Add moderation**: Create an `approved` boolean column and add policies to only show approved sightings
3. **Rate limiting**: Use Supabase Edge Functions or a middleware to prevent spam

## Next Steps

- Consider adding image upload functionality using Supabase Storage
- Add user authentication if you want to track who submitted each sighting
- Implement a moderation system for reviewing sightings before they appear publicly
- Add email notifications for new sightings using Supabase Edge Functions

