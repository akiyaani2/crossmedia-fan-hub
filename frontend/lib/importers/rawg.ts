import { InsertItem } from './_supabase';

// Base URL for the RAWG API
const RAWG_API_URL = 'https://api.rawg.io/api';
const RAWG_API_KEY = process.env.RAWG_API_KEY;

if (!RAWG_API_KEY) {
  console.warn('WARNING: Missing RAWG_API_KEY environment variable. RAWG importer will not work.');
}

export async function searchRAWG(query: string, fandomSlug: string): Promise<InsertItem[]> {
  if (!RAWG_API_KEY) {
    throw new Error("RAWG API key is not configured.");
  }

  // Construct the search URL - consult RAWG documentation for exact parameters
  const searchUrl = `${RAWG_API_URL}/games?key=${RAWG_API_KEY}&search=${encodeURIComponent(query)}&page_size=10`; // Fetch 10 results

  try {
    const res = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'YourAppName/1.0 (YourContactInfo)' // Recommended by RAWG docs
      }
    });

    if (!res.ok) {
      console.error(`RAWG API error! Status: ${res.status}, Body: ${await res.text()}`);
      throw new Error(`RAWG API request failed with status ${res.status}`);
    }

    const data = await res.json();
    const results = data.results || [];

    // Map results to InsertItem - **ADJUST PROPERTY NAMES BASED ON ACTUAL API RESPONSE**
    return results.map((item: any): InsertItem => ({
      title: item.name || 'Untitled Game', // RAWG usually uses 'name'
      type: 'game',
      external_id: String(item.id), // Ensure this is the correct unique ID
      source: 'rawg',
      fandom_slug: fandomSlug,
      created_at: new Date().toISOString(),
      // Add other fields like description (item.description_raw), 
      // background image (item.background_image), release date (item.released)
    }));

  } catch (error) {
    console.error("Error fetching or processing RAWG search:", error);
    throw new Error("Failed to fetch data from RAWG.");
  }
} 