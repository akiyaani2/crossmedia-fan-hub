'use client';

import { useState, useEffect } from 'react';
import { supabaseBrowser } from '@/lib/supabaseBrowser';
import Card from '@/components/Card';
import Sidebar from '@/components/Sidebar';
import type { Database } from '@/types/supabase';

// MediaItem type from Supabase database
type MediaItem = Database['public']['Tables']['media_items']['Row'];

// Placeholder data for initial view
const placeholderItems: Partial<MediaItem>[] = Array(10).fill(null).map((_, i) => ({
  id: `placeholder-${i}`,
  title: 'Loading Title...',
  poster_url: null, // Or a placeholder image URL
  media_type: 'unknown',
  popularity: 0,
}));

export default function ExplorePage() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  // Start with placeholder items, set flag when real search happens
  const [items, setItems] = useState<Partial<MediaItem>[]>(placeholderItems);
  const [hasSearched, setHasSearched] = useState(false);

  // Debounced live‑search for dropdown suggestions
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    const timeout = setTimeout(async () => {
      const res = await fetch(`/api/search/titles?q=${encodeURIComponent(query)}&limit=5`);
      const { titles } = (await res.json()) as { titles: string[] };
      setSuggestions(titles);
    }, 250);
    return () => clearTimeout(timeout);
  }, [query]);

  // Main search handler: check cache, then import externally if needed
  async function handleSearch(q: string = query) {
    // 1) Try Supabase cache
    let { data } = await supabaseBrowser
      .from('media_items')
      .select('*')
      .ilike('title', `%${q}%`);
    // 2) If no cache hits, import externally and re‑query
    if (!data?.length) {
      await fetch(`/api/import/tmdb?q=${encodeURIComponent(q)}`);
      const fresh = await supabaseBrowser
        .from('media_items')
        .select('*')
        .ilike('title', `%${q}%`);
      data = fresh.data;
    }
    setItems(data || []);
    setSuggestions([]);
    setHasSearched(true); // Mark that a search has been performed
  }

  return (
    <div className="flex gap-8 bg-midnight-ink text-light-gray min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-headline font-bold mb-8 text-white">Explore Content</h1>
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-grow max-w-xl">
            <input
              type="text"
              className="border border-medium-gray bg-gray-800/50 placeholder-medium-gray text-light-gray rounded px-4 py-2 w-full focus:outline-none focus:border-neon-accent focus:ring-1 focus:ring-neon-accent/50 transition duration-200"
              placeholder="Search movies, games, comics…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            {suggestions.length > 0 && (
              <ul className="absolute bg-gray-800 border border-medium-gray w-full mt-1 rounded shadow-lg z-10 overflow-hidden">
                {suggestions.map((t, i) => (
                  <li
                    key={i}
                    className="px-4 py-2 hover:bg-cosmic-blue/30 cursor-pointer transition duration-150"
                    onClick={() => { setQuery(t); handleSearch(t); }}
                  >
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            onClick={() => handleSearch()}
            className="bg-cosmic-blue hover:bg-opacity-80 text-white font-semibold px-5 py-2 rounded transition duration-200 focus:outline-none focus:ring-2 focus:ring-cosmic-blue/50 focus:ring-offset-2 focus:ring-offset-midnight-ink"
          >
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 py-6">
          {items.map(item => (
            <Card
              key={item.id}
              title={item.title ?? 'Loading...'}
              posterUrl={item.poster_url ?? null}
              type={item.media_type ?? 'unknown'}
              user={item.id?.toString().startsWith('placeholder') ? '' : '—'}
              likes={item.popularity ?? 0}
              comments={(item.popularity ?? 0) * 10}
              isLoading={item.id?.toString().startsWith('placeholder')}
            />
          ))}
          {hasSearched && !items.length && (
            <p className="col-span-full text-center text-medium-gray py-10">
              No results found for “<span className="text-light-gray font-medium">{query}</span>”
            </p>
          )}
        </div>
      </main>
    </div>
  );
} 