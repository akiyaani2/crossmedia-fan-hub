import { NextRequest, NextResponse } from 'next/server'
import type { Database } from '@/types/supabase'

export async function GET(request: NextRequest, { params }: { params: { source: string } }) {
  const source = params.source;
  // Dynamically import external API helpers and supabase client
  const { fetchTMDB, fetchRAWG, fetchComicVine, supabaseAdmin } = await import('@/lib/externalApi')
  const url = new URL(request.url)
  const q = url.searchParams.get('q') || ''
  const page = Number(url.searchParams.get('page') || '1')
  if (!q) {
    return NextResponse.json({ imported: 0 })
  }

  let items: Database['public']['Tables']['media_items']['Insert'][] = []
  switch (source) {
    case 'tmdb':
      items = await fetchTMDB(q, page)
      break
    case 'rawg':
      items = await fetchRAWG(q, page)
      break
    case 'comicvine':
      items = await fetchComicVine(q, page)
      break
    default:
      return NextResponse.json({ error: 'Invalid source' }, { status: 400 })
  }

  const { error } = await supabaseAdmin
    .from('media_items')
    .upsert(items, { onConflict: 'external_id,source' })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ imported: items.length })
} 