'use client'; // Needed if state is added later for active tab
import React from 'react';

interface TabsProps {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
}

// Basic placeholder Tabs component - replace with a proper implementation later
const Tabs: React.FC<TabsProps> = ({ tabs, active, onChange }) => {
  return (
    <div className="border-b border-medium-gray/20 mb-6">
      <nav className="-mb-px flex space-x-6" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-150 
                        ${active === tab
                          ? 'border-neon-accent text-neon-accent'
                          : 'border-transparent text-medium-gray hover:text-light-gray hover:border-light-gray/50'
                        }`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Tabs; 