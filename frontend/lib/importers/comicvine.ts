import { InsertItem } from './_supabase';

// IMPORTANT: Replace with the actual ComicVine API endpoint and parameter names
const COMICVINE_API_URL = 'https://comicvine.gamespot.com/api/search'; // Example endpoint
const COMICVINE_API_KEY = process.env.COMICVINE_API_KEY;

if (!COMICVINE_API_KEY) {
  console.warn('WARNING: Missing COMICVINE_API_KEY environment variable. ComicVine importer will not work.');
}

export async function searchComicVine(query: string, fandomSlug: string): Promise<InsertItem[]> {
  if (!COMICVINE_API_KEY) {
    throw new Error("ComicVine API key is not configured.");
  }

  // Construct the API URL - adjust parameters as needed (e.g., format, resource_type, field_list)
  // Consult ComicVine API documentation for correct parameters.
  const searchUrl = `${COMICVINE_API_URL}/?api_key=${COMICVINE_API_KEY}&format=json&query=${encodeURIComponent(query)}&resources=volume,issue&limit=10`; // Example: search volumes and issues

  try {
    const res = await fetch(searchUrl, {
      // ComicVine might require specific headers, like User-Agent
      headers: {
        'User-Agent': 'YourAppName/1.0 (YourContactInfo)' // Replace with your app details
      }
    });

    if (!res.ok) {
      console.error(`ComicVine API error! Status: ${res.status}, Body: ${await res.text()}`);
      throw new Error(`ComicVine API request failed with status ${res.status}`);
    }

    const data = await res.json();

    // Check for API-specific error messages
    if (data.error !== 'OK') {
      console.error("ComicVine API returned an error:", data.error);
      throw new Error(`ComicVine API error: ${data.error}`);
    }

    const results = data.results || [];
    
    // Map results to InsertItem - **ADJUST PROPERTY NAMES BASED ON ACTUAL API RESPONSE**
    return results.slice(0, 10).map((item: any): InsertItem => ({
      title: item.name || item.volume?.name || 'Untitled Comic', // Adjust based on response structure
      type: 'comic',
      external_id: String(item.id), // Ensure this is the correct unique ID
      source: 'comicvine',
      fandom_slug: fandomSlug,
      created_at: new Date().toISOString(),
      // Add other fields like description (item.description), cover image URL (item.image?.medium_url)
    }));

  } catch (error) {
    console.error("Error fetching or processing ComicVine search:", error);
    throw new Error("Failed to fetch data from ComicVine.");
  }
} 