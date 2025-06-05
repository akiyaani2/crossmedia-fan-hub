import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  const limit = parseInt(searchParams.get('limit') || '5', 10);

  const { data, error } = await supabaseAdmin
    .from('media_items')
    .select('title')
    .ilike('title', `%${q}%`)
    .limit(limit);

  if (error) {
    console.error(error);
    return NextResponse.json({ titles: [] }, { status: 500 });
  }

  return NextResponse.json({ titles: data.map((r: { title: string }) => r.title) });
} 