'use client';

import React, { useState } from 'react';

// TODO: Define prop types more strictly if needed
interface FandomTabsProps {
  fandomSlug: string;
  initialWorks?: any[]; // Make initialWorks optional or handle appropriately
}

// Placeholder for Tab component (can be moved to shared components)
const TabButton = ({ children, active, onClick }: { children: React.ReactNode, active?: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2 font-medium rounded-t-md 
              ${active 
                ? 'bg-gray-800/50 border-b-2 border-neon-accent text-neon-accent' 
                : 'text-light-gray/70 hover:text-light-gray hover:bg-gray-800/20'}
              transition-colors`}
  >
    {children}
  </button>
);

// Client Component to handle tabs and display content passed from server
export default function FandomTabs({ fandomSlug }: FandomTabsProps) {
  const [activeTab, setActiveTab] = useState('Works');
  const tabs = ['Works', 'Discussions', 'Creators', 'Info'];

  // Placeholder content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'Works':
        // TODO: Fetch and display actual works based on fandomSlug
        // For now, showing placeholder text.
        // You might pass initialWorks here or fetch dynamically.
        return <p>No works loaded for “{fandomSlug}” yet.</p>;
      case 'Discussions':
        return <p>[Discussions coming soon]</p>;
      case 'Creators':
        return <p>[Creators coming soon]</p>;
      case 'Info':
        // TODO: Fetch and display fandom info/metadata
        return <p>[Info coming soon]</p>;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Tab Navigation Buttons */}
      <div className="mb-6 flex gap-2 border-b border-gray-700">
        {tabs.map((tabName) => (
          <button
            key={tabName}
            onClick={() => setActiveTab(tabName)}
            className={`px-3 py-2 text-sm font-medium transition-colors duration-150 
                        ${activeTab === tabName
                          ? 'border-b-2 border-teal-400 text-white' 
                          : 'border-b-2 border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'}
                      `}
          >
            {tabName}
          </button>
        ))}
      </div>

      {/* Tab Content Area */}
      <div className="text-gray-300 text-sm">
        {renderContent()}
      </div>
    </>
  );
} 