'use client';
import { ReactNode, useState } from 'react';
import clsx from 'clsx';

export default function SidebarGroup({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);

  return (
    <div
      className={clsx(
        'sidebar-group',
        open || pinned ? 'open' : 'closed'
      )}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => !pinned && setOpen(false)}
    >
      <button
        className="group-header flex items-center gap-2 w-full px-2 py-1 hover:bg-gray-700/50 rounded transition-colors duration-150"
        onClick={() => setPinned(!pinned)}
      >
        {icon}
        <span className="text-sm font-medium text-light-gray/80 group-hover:text-light-gray transition-colors duration-150">{title}</span>
      </button>
      <div className="group-body overflow-hidden transition-all duration-300 ease-in-out pl-2 pt-1 border-l border-medium-gray/10 ml-[10px]">
        {children}
      </div>
    </div>
  );
} 