import { supabaseAdmin } from './supabaseAdmin'
import type { Database } from '@/types/supabase'

type MediaItemInput = Database['public']['Tables']['media_items']['Insert']

/**
 * importPopularDaily calls various providers to import popular items daily.
 *
 * TODO:
 * - Fetch TMDb /movie/popular & /tv/popular endpoints.
 * - Fetch RAWG /games/lists/popular.
 * - Fetch ComicVine most popular issues.
 * - Upsert results into media_items using supabaseAdmin.upsert.
 *
 * Example Vercel Cron YAML:
 * ┌ schedule: "0 6 * * *"
 * └ command: "curl -s https://crossmedia.vercel.app/api/import/tmdb?popular=true"
 */
export async function importPopularDaily() {
  // TODO: implement popular items import and upsert batch
} 