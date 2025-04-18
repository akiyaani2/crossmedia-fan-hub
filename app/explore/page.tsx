'use client';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import SearchInput from '@/components/SearchInput';
import Tabs, { Tab } from '@/components/Tabs';
import SkeletonGrid from '@/components/SkeletonGrid';
import MediaGrid from '@/components/MediaGrid';

interface Item { id: string; title: string; type: string }

export default function ExplorePage() {
  const [q, setQ] = useState('');
  const [tab, setTab] = useState<Tab>('All');
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    const params = new URLSearchParams({ q, limit: '24' }).toString();
    fetch(`/api/search/titles?${params}`)
      .then(r => (r.ok ? r.json() : []))
      .then((data: Item[]) => {
        if (!ignore) {
          const filtered =
            tab === 'All' ? data : data.filter(d => d.type.toLowerCase() === tab.toLowerCase());
          setItems(filtered);
          setLoading(false);
        }
      })
      .catch(() => { if (!ignore) setLoading(false); });
    return () => { ignore = true; };
  }, [q, tab]);

  return (
    <div className="flex gap-8">
      <Sidebar />
      <main className="flex-1 px-8 py-6">
        <SearchInput value={q} onChange={setQ} />
        <Tabs active={tab} onChange={setTab} />
        {loading ? <SkeletonGrid /> : <MediaGrid items={items} />}
      </main>
    </div>
  );
} 