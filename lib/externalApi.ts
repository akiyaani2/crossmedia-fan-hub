import { supabaseAdmin } from './supabaseAdmin'
import type { Database } from '@/types/supabase'

type MediaItemInput = Database['public']['Tables']['media_items']['Insert']

// TMDb Configuration
const TMDB_API_KEY = process.env.TMDB_API_KEY ?? ''
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
let tmdbConfig: { base_url: string; poster_sizes: string[] } | null = null

async function getTMDBConfig() {
  if (!tmdbConfig) {
    const res = await fetch(`${TMDB_BASE_URL}/configuration?api_key=${TMDB_API_KEY}`)
    const json = await res.json()
    tmdbConfig = {
      base_url: json.images.secure_base_url,
      poster_sizes: json.images.poster_sizes,
    }
  }
  return tmdbConfig!
}

export async function fetchTMDB(
  query: string,
  page = 1,
  language = 'en-US',
  options?: { append?: string; exactId?: number; mediaType?: 'movie' | 'tv' }
): Promise<MediaItemInput[]> {
  const config = await getTMDBConfig()
  const url = options?.append && options.exactId
    ? `${TMDB_BASE_URL}/${options.mediaType ?? 'movie'}/${options.exactId}?api_key=${TMDB_API_KEY}&append_to_response=${options.append}&language=${language}`
    : `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&language=${language}&query=${encodeURIComponent(query)}&page=${page}`

  const res = await fetch(url)
  const json = await res.json()
  const results = options?.append && options.exactId ? [json] : json.results

  return (results as any[]).map(item => {
    const posterSize = config.poster_sizes[2]
    const poster_url = item.poster_path ? `${config.base_url}${posterSize}${item.poster_path}` : null
    const release_date = item.release_date ?? item.first_air_date
    const title = item.title ?? item.name ?? ''
    const overview = item.overview ?? ''
    const media_type = item.media_type ?? (options?.mediaType ?? 'movie')
    return {
      external_id: String(item.id),
      source: 'tmdb',
      media_type,
      title,
      overview,
      release_date: release_date || null,
      poster_url,
      popularity: item.popularity ?? 0,
    } as MediaItemInput
  })
}

// RAWG Configuration
const RAWG_API_KEY = process.env.RAWG_API_KEY ?? ''
const RAWG_BASE_URL = 'https://api.rawg.io/api'

export async function fetchRAWG(
  query: string,
  page = 1,
  pageSize = 20
): Promise<MediaItemInput[]> {
  const url = `${RAWG_BASE_URL}/games?key=${RAWG_API_KEY}&search=${encodeURIComponent(query)}&page=${page}&page_size=${pageSize}`
  const res = await fetch(url)
  const json = await res.json()

  return (json.results || []).map((game: any) => ({
    external_id: String(game.id),
    source: 'rawg',
    media_type: 'game',
    title: game.name,
    overview: game.description_raw ?? '',
    release_date: game.released ?? null,
    poster_url: game.background_image ?? null,
    popularity: game.rating ?? 0,
  } as MediaItemInput))
}

// ComicVine Configuration
const CV_API_KEY = process.env.COMICVINE_API_KEY ?? ''
const CV_BASE_URL = 'https://comicvine.gamespot.com/api'

export async function fetchComicVine(
  query: string,
  page = 1
): Promise<MediaItemInput[]> {
  const url = `${CV_BASE_URL}/search/?api_key=${CV_API_KEY}&format=json&resources=issue&field_list=id,name,deck,image,cover_date&query=${encodeURIComponent(query)}&page=${page}`
  const res = await fetch(url, { headers: { 'User-Agent': 'CrossMedia-Fan-Hub/1.0 (+https://crossmedia.app)' } })
  const json = await res.json()

  return (json.results || []).map((item: any) => ({
    external_id: String(item.id),
    source: 'comicvine',
    media_type: 'comic',
    title: item.name,
    overview: item.deck ?? '',
    release_date: item.cover_date ?? null,
    poster_url: item.image?.medium_url ?? null,
    popularity: 0,
  } as MediaItemInput))
}

// TODO: stream TMDb daily‑ID gzip files from http://files.tmdb.org/p/exports/
// and bulk‑insert with COPY for ultra‑fast cold‑start seeding.

// Re-export the admin client for convenience
export { supabaseAdmin } 