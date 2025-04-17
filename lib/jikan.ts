import type { Database } from '@/types/supabase'

type MediaItemInput = Database['public']['Tables']['media_items']['Insert']

/**
 * TODO: Implement integration with Jikan API (Anime).
 * Fetch https://api.jikan.moe/v4/anime?q={query}&page={page}&limit=20 then normalize results.
 */
export async function fetchJikan(
  query: string,
  page = 1
): Promise<MediaItemInput[]> {
  // TODO: call Jikan API and normalize results to MediaItemInput[]
  return []
} 