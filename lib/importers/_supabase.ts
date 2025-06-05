import { createClient } from '@supabase/supabase-js';

// Note: This re-uses the Supabase admin client logic. 
// Ensure your environment variables are set correctly.
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn('WARNING: Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL. Supabase admin client might not work correctly.');
}

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
);

// Define the type for items being inserted into 'media_items'
export type InsertItem = {
  title: string;
  type: 'video' | 'comic' | 'game';
  external_id: string; // ID from the external source (TMDB, ComicVine, RAWG)
  source: string; // Identifier for the source ('tmdb', 'comicvine', 'rawg')
  fandom_slug: string; // The fandom this item is associated with
  created_at?: string; // Optional: Supabase can handle default timestamps
  // Add other potential fields from your media_items schema if needed
  // e.g., description?: string; poster_url?: string;
};

export async function upsertItems(items: InsertItem[]) {
  if (items.length === 0) {
    console.log("No items to upsert.");
    return []; // Return empty array if no items provided
  }

  // Ensure created_at is set if not provided
  const itemsWithTimestamp = items.map(item => ({
    ...item,
    created_at: item.created_at || new Date().toISOString(),
  }));

  console.log(`Attempting to upsert ${itemsWithTimestamp.length} items...`);

  const { error, data } = await supabaseAdmin
    .from('media_items') // Ensure this table name matches your Supabase schema
    .upsert<InsertItem>(itemsWithTimestamp, { 
        onConflict: 'external_id, source', // Specify conflict columns
        // ignoreDuplicates: false // Default is false, upsert will update existing rows
     }); 

  if (error) { 
    console.error("Supabase upsert error:", error);
    throw new Error(`Supabase upsert failed: ${error.message}`);
  }
  
  console.log("Upsert successful, data:", data);
  return data; // Return the data from Supabase (may be null or array depending on operation)
} 