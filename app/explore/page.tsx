'use client';

import { useState, useEffect } from 'react';
import { supabaseBrowser } from '@/lib/supabaseBrowser';
import Card from '@/components/Card';
import type { Database } from '@/types/supabase';

// MediaItem type from Supabase database
type MediaItem = Database['public']['Tables']['media_items']['Row'];

export default function ExplorePage() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [items, setItems] = useState<MediaItem[]>([]);

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
  }

  return (
    <div className="p-6">
      <div className="relative w-full max-w-xl">
        <input
          type="text"
          className="border rounded px-3 py-2 w-full"
          placeholder="Search movies, games, comics…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        {suggestions.length > 0 && (
          <ul className="absolute bg-white dark:bg-gray-800 w-full mt-1 rounded shadow-lg z-10">
            {suggestions.map((t, i) => (
              <li
                key={i}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
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
        className="mt-2 bg-cosmic-blue text-white px-4 py-2 rounded"
      >
        Search
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
        {items.map(item => (
          <Card
            key={item.id}
            title={item.title}
            posterUrl={item.poster_url}
            type={item.media_type}
            user="—"
            likes={item.popularity ?? 0}
            comments={(item.popularity ?? 0) * 10}
          />
        ))}
        {!items.length && (
          <p className="col-span-full text-center text-gray-500">
            No results for “{query}”
          </p>
        )}
      </div>
    </div>
  );
} 