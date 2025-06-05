import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

// Create Supabase client for browser or stub during server/build
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let supabaseBrowser: SupabaseClient<Database> | any
if (typeof window !== 'undefined' && supabaseUrl && supabaseAnonKey) {
  supabaseBrowser = createClient<Database>(supabaseUrl, supabaseAnonKey)
} else {
  // Stub for server/build-time to avoid missing key errors
  const stubBuilder: any = {
    select: () => stubBuilder,
    ilike: () => stubBuilder,
    range: async () => ({ data: [], count: 0 }),
  }
  supabaseBrowser = { from: () => stubBuilder } as any
}

export { supabaseBrowser } 