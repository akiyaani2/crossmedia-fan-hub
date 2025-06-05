import type { Database } from '@/types/supabase'

type MediaItemInput = Database['public']['Tables']['media_items']['Insert']

/**
 * TODO: Implement integration with Google Books API.
 * Fetch volumes?q={query}&startIndex={(page-1)*20}&maxResults=20, then normalize to MediaItemInput.
 */
export async function fetchGoogleBooks(
  query: string,
  page = 1
): Promise<MediaItemInput[]> {
  // TODO: call Google Books API and normalize results to MediaItemInput[]
  return []
} 