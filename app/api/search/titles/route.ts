import { NextRequest, NextResponse } from 'next/server';
import supabaseAdmin from '@/lib/supabaseAdmin';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  const limit = parseInt(searchParams.get('limit') || '5', 10);

  const { data, error } = await supabaseAdmin
    .from('media_items')
    .select('id, title, media_type')
    .ilike('title', `%${q}%`)
    .limit(limit);

  if (error) {
    console.error(error);
    return NextResponse.json([], { status: 500 });
  }

  const results = (data ?? []).map(item => ({
    id: item.id,
    title: item.title,
    type: item.media_type,
  }));
  return NextResponse.json(results);
} 