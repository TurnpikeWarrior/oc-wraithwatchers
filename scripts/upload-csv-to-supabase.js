/**
 * Script to upload ghost sightings CSV data to Supabase
 * 
 * Usage: node scripts/upload-csv-to-supabase.js
 */

const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing Supabase environment variables');
  console.error('Please make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadCSVToSupabase() {
  console.log('🚀 Starting CSV upload to Supabase...\n');

  // Read CSV file
  const csvFilePath = path.join(__dirname, '../app/data/ghost_sightings_12000_with_images.csv');
  
  if (!fs.existsSync(csvFilePath)) {
    console.error(`❌ Error: CSV file not found at ${csvFilePath}`);
    process.exit(1);
  }

  const csvContent = fs.readFileSync(csvFilePath, 'utf-8');
  
  console.log('📄 Parsing CSV file...');
  
  // Parse CSV
  const parseResult = Papa.parse(csvContent, {
    header: true,
    skipEmptyLines: true,
  });

  if (parseResult.errors.length > 0) {
    console.error('❌ CSV parsing errors:', parseResult.errors);
    process.exit(1);
  }

  const rows = parseResult.data;
  console.log(`✅ Parsed ${rows.length} rows from CSV\n`);

  // Transform data to match database schema
  const sightings = rows.map(row => ({
    date: row['Date of Sighting'],
    latitude: parseFloat(row['Latitude of Sighting']),
    longitude: parseFloat(row['Longitude of Sighting']),
    city: row['Nearest Approximate City'] || 'Unknown',
    state: row['US State'] || 'Unknown',
    notes: row['Notes about the sighting'] || '',
    time_of_day: row['Time of Day'],
    tag: row['Tag of Apparition'],
    image_url: row['Image Link'] || '',
  }));

  console.log('📊 Sample record:');
  console.log(JSON.stringify(sightings[0], null, 2));
  console.log('');

  // Check if table already has data
  const { data: existingData, error: checkError } = await supabase
    .from('ghost_sightings')
    .select('id', { count: 'exact', head: true });

  if (checkError) {
    console.error('❌ Error checking existing data:', checkError.message);
    console.error('Make sure the ghost_sightings table exists in your Supabase database');
    process.exit(1);
  }

  // Upload in batches (Supabase recommends batches of 1000 or less)
  const BATCH_SIZE = 1000;
  const totalBatches = Math.ceil(sightings.length / BATCH_SIZE);
  let uploadedCount = 0;
  let errorCount = 0;

  console.log(`📤 Uploading ${sightings.length} sightings in ${totalBatches} batches...\n`);

  for (let i = 0; i < totalBatches; i++) {
    const start = i * BATCH_SIZE;
    const end = Math.min((i + 1) * BATCH_SIZE, sightings.length);
    const batch = sightings.slice(start, end);

    console.log(`   Batch ${i + 1}/${totalBatches}: Uploading records ${start + 1}-${end}...`);

    const { data, error } = await supabase
      .from('ghost_sightings')
      .insert(batch)
      .select();

    if (error) {
      console.error(`   ❌ Error in batch ${i + 1}:`, error.message);
      errorCount += batch.length;
    } else {
      uploadedCount += data.length;
      console.log(`   ✅ Successfully uploaded ${data.length} records`);
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 Upload Summary:');
  console.log('='.repeat(50));
  console.log(`✅ Successfully uploaded: ${uploadedCount} records`);
  if (errorCount > 0) {
    console.log(`❌ Failed: ${errorCount} records`);
  }
  console.log(`📝 Total processed: ${sightings.length} records`);
  console.log('='.repeat(50));

  // Verify final count
  const { count } = await supabase
    .from('ghost_sightings')
    .select('*', { count: 'exact', head: true });

  console.log(`\n🎉 Total records now in database: ${count}`);
  console.log('\n✨ Upload complete!');
}

// Run the upload
uploadCSVToSupabase()
  .then(() => {
    console.log('\n✅ Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });

