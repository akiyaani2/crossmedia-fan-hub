import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

// Create a Supabase client with service-role key for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

let supabaseAdmin: SupabaseClient<Database> | { from: any }
if (supabaseUrl && supabaseServiceRoleKey) {
  supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceRoleKey)
} else {
  // Stub during build or missing ENV
  supabaseAdmin = {
    from: (_: string) => ({
      upsert: async (_: any, __: any) => ({ data: [], error: null })
    })
  } as any
}

export { supabaseAdmin } 