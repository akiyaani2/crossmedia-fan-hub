import { InsertItem } from './_supabase';

const TMDB_API_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY;

// Basic error check for the API key during module load
if (!TMDB_API_KEY) {
  console.warn('WARNING: Missing TMDB_API_KEY environment variable. TMDB importer will not work.');
}

export async function searchTMDB(query: string, fandomSlug: string): Promise<InsertItem[]> {
  if (!TMDB_API_KEY) {
    throw new Error("TMDB API key is not configured.");
  }

  // Search both movies and TV shows for broader results, then combine
  // You might want to adjust this based on your specific needs
  const movieSearchUrl = `${TMDB_API_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&include_adult=false`;
  const tvSearchUrl = `${TMDB_API_URL}/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&include_adult=false`;

  try {
    const [movieRes, tvRes] = await Promise.all([
      fetch(movieSearchUrl),
      fetch(tvSearchUrl)
    ]);

    if (!movieRes.ok) {
      console.error(`TMDB Movie Search API error! Status: ${movieRes.status}`);
      // Consider throwing or returning partial results based on your strategy
    }
    if (!tvRes.ok) {
      console.error(`TMDB TV Search API error! Status: ${tvRes.status}`);
      // Consider throwing or returning partial results
    }

    const movieData = movieRes.ok ? await movieRes.json() : { results: [] };
    const tvData = tvRes.ok ? await tvRes.json() : { results: [] };

    const combinedResults = [...movieData.results, ...tvData.results];

    // Sort results (optional, e.g., by popularity) and take top N
    combinedResults.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    const topResults = combinedResults.slice(0, 10);

    return topResults.map((item: any): InsertItem => ({
      title: item.title || item.name, // Use 'name' for TV shows
      type: 'video',
      external_id: String(item.id),
      source: 'tmdb',
      fandom_slug: fandomSlug,
      created_at: new Date().toISOString(),
      // You could add more fields here if needed, e.g., 
      // description: item.overview,
      // poster_url: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null,
    }));

  } catch (error) {
    console.error("Error fetching or processing TMDB search:", error);
    throw new Error("Failed to fetch data from TMDB."); // Rethrow or handle appropriately
  }
} 