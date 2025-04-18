'use client';
import clsx from 'clsx';

const tabs = ['All', 'Books', 'Comics', 'Fanfic', 'Video'] as const;
export type Tab = typeof tabs[number];

interface Props { active: Tab; onChange(t: Tab): void }
export default function Tabs({ active, onChange }: Props) {
  return (
    <div className="mb-4 flex gap-2">
      {tabs.map(t => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={clsx(
            'px-3 py-1 rounded text-sm',
            active === t ? 'bg-blue-600 text-white' : 'bg-gray-100'
          )}
        >
          {t}
        </button>
      ))}
    </div>
  );
} 