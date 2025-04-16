'use client'; // Needed for state management

// app/fandoms/[fandomSlug]/page.tsx
import React, { useState } from 'react'; // Import useState
// Placeholder for Content Grid (we are adding placeholder inline for now)
// import ContentGrid from '@/components/ContentGrid'; 

// Placeholder for Tab component
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

// Use 'params' to access the dynamic route segment
export default function FandomPage({ params }: { params: { fandomSlug: string } }) {
  const fandomName = decodeURIComponent(params.fandomSlug).replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()); // Basic formatting

  // State for active tab
  const [activeTab, setActiveTab] = useState('Works'); // Default to 'Works'
  const tabs = ['Works', 'Discussions', 'Creators', 'Info'];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Themed Banner - Placeholder */}
      <div className="h-48 md:h-64 bg-gradient-to-r from-deep-purple to-cosmic-blue mb-6 rounded-lg flex flex-col justify-end p-6 md:p-8 text-white shadow-lg">
        <h1 className="text-3xl md:text-5xl font-bold font-headline drop-shadow-md">{fandomName}</h1>
        {/* Add Fandom Description / Stats Later */}
        <p className="text-sm md:text-base text-light-gray/80 mt-1">[Fandom description placeholder]</p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8 border-b border-medium-gray/30 flex space-x-1">
        {tabs.map(tab => (
           <TabButton 
             key={tab} 
             active={activeTab === tab} 
             onClick={() => setActiveTab(tab)}
           >
             {tab}
           </TabButton>
         ))}
      </div>

      {/* Content Area based on active tab */}
      <div>
        {/* Conditional rendering based on activeTab state */} 
        {activeTab === 'Works' && (
          // Reuse or adapt ContentGrid component here
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
             {/* Map ContentCard placeholders for this fandom */}
             {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="bg-gray-800/50 border border-medium-gray/30 rounded-lg aspect-video flex items-center justify-center">
                  <p className="text-medium-gray">Work Card {index + 1}</p>
                </div>
             ))}
          </div>
        )}
        {/* Add placeholders for other tabs */}
        {activeTab === 'Discussions' && <div className="p-6 bg-gray-800/30 rounded-lg text-light-gray">[Discussions Feed Placeholder]</div>}
        {activeTab === 'Creators' && <div className="p-6 bg-gray-800/30 rounded-lg text-light-gray">[Creators List Placeholder]</div>}
        {activeTab === 'Info' && <div className="p-6 bg-gray-800/30 rounded-lg text-light-gray">[Fandom Info/Wiki Placeholder]</div>}
      </div>

    </div>
  );
}

// Note: This assumes ContentGrid is refactored into a reusable component.
// For now, a simple grid placeholder is added directly. 