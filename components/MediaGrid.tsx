interface Item { id: string; title: string; type: string }
export default function MediaGrid({ items }: { items: Item[] }) {
  if (!items.length) return <p className="text-gray-500">No results.</p>;
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map(it => (
        <div key={it.id} className="border rounded p-4">
          <p className="font-medium">{it.title}</p>
          <span className="text-xs text-gray-500">{it.type}</span>
        </div>
      ))}
    </div>
  );
} 