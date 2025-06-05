import { NextRequest, NextResponse } from 'next/server';
import { searchRAWG } from '@/lib/importers/rawg';
import { upsertItems } from '@/lib/importers/_supabase';

// Define the runtime environment if necessary (e.g., edge)
// export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');
  const fandomSlug = searchParams.get('fandom');

  // Validate required parameters
  if (!query) {
    return NextResponse.json({ error: "Missing required query parameter: q" }, { status: 400 });
  }
  if (!fandomSlug) {
    return NextResponse.json({ error: "Missing required query parameter: fandom" }, { status: 400 });
  }

  console.log(`RAWG Import Request: query=${query}, fandom=${fandomSlug}`);

  try {
    // Fetch items from the external API
    const itemsToInsert = await searchRAWG(query, fandomSlug);
    
    if (itemsToInsert.length === 0) {
        console.log("No RAWG results found to insert.");
        return NextResponse.json({ inserted: 0, message: "No results found from RAWG." });
    }

    // Upsert items into Supabase
    const insertedData = await upsertItems(itemsToInsert);
    const insertedCount = Array.isArray(insertedData) ? insertedData.length : 0;
    console.log(`RAWG Import Success: Inserted/Updated ${insertedCount} items.`);

    // Return success response
    return NextResponse.json({ inserted: insertedCount });

  } catch (err: any) {
    console.error("[API Import RAWG Error]:", err);
    // Return error response
    return NextResponse.json(
      { error: `Failed to import from RAWG: ${err.message || 'Unknown error'}` },
      { status: 500 }
    );
  }
} 