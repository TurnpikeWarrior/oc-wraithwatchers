import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/utils/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Extract and validate data
    const { date, latitude, longitude, city, state, notes, timeOfDay, tag, imageUrl } = body;
    
    if (!date || !latitude || !longitude || !timeOfDay || !tag || !notes) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('ghost_sightings')
      .insert([
        {
          date,
          latitude,
          longitude,
          city: city || 'Unknown',
          state: state || 'Unknown',
          notes,
          time_of_day: timeOfDay,
          tag,
          image_url: imageUrl || '',
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save sighting', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data },
      { status: 201 }
    );
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('ghost_sightings')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch sightings', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

