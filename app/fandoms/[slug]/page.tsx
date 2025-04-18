import React from 'react';
import FandomHero from '@/components/FandomHero';
import Tabs from '@/components/Tabs';
import Card from '@/components/Card'; // Import Card for placeholder grid

// Helper function to capitalize slugs
function formatFandomName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function FandomHubPage({ params }: { params: { slug: string } }) {
  const fandomName = formatFandomName(params.slug);
  // Placeholder state for active tab
  const [activeTab, setActiveTab] = React.useState('Works');
  
  return (
    // Add background and padding consistent with explore page
    <div className="px-8 py-6 bg-midnight-ink min-h-screen text-light-gray flex-grow">
      <FandomHero name={fandomName} />
      <Tabs active={activeTab} onChange={setActiveTab} tabs={['Works','Discussions','Creators','Info']} />
      
      {/* Content area based on active tab - Showing placeholder Works grid for now */}
      {activeTab === 'Works' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
          {/* Placeholder Cards matching Explore page */}
          {Array.from({ length: 10 }).map((_, i) => (
            <Card 
              key={`placeholder-work-${i}`} 
              title="" 
              posterUrl={null}
              type="" 
              user="" 
              likes={0} 
              comments={0} 
              isLoading={true} />
          ))}
        </div>
      )}
      {activeTab === 'Discussions' && <div className="mt-6 text-center text-medium-gray">Discussions placeholder...</div>}
      {activeTab === 'Creators' && <div className="mt-6 text-center text-medium-gray">Creators placeholder...</div>}
      {activeTab === 'Info' && <div className="mt-6 text-center text-medium-gray">Info placeholder...</div>}
    </div>
  );
} 