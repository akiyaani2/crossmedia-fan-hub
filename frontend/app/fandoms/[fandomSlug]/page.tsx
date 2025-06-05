import React from 'react';
import FandomTabs from './FandomTabs';

// TODO: Define interfaces for fetched data if needed (e.g., FandomDetails)

export default async function FandomPage({ params }: { params: { fandomSlug: string } }) {
  // Decode and format the fandom name from the slug
  const { fandomSlug } = params;
  const name = decodeURIComponent(fandomSlug)
    .replace(/-/g, ' ') // Replace hyphens with spaces
    .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize each word

  // --- TODO: Fetch real fandom data based on fandomSlug --- 
  // Example:
  // const fandomData = await fetchFandomDetails(fandomSlug);
  // if (!fandomData) { notFound(); } // Handle case where fandom doesn't exist
  // --------------------------------------------------------

  return (
    <div className="container mx-auto px-4 py-8">
      {/* --- Fandom Header --- */}
      {/* Placeholder gradient, replace with actual banner/image if available */}
      <div className="h-48 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg mb-6 flex items-end p-6 text-white shadow-lg">
        <h1 className="text-4xl font-bold drop-shadow-md">{name}</h1>
      </div>

      {/* --- Tabs Component --- */}
      {/* Pass necessary data (like slug or fetched data) to the client component */}
      <FandomTabs fandomSlug={fandomSlug} /* Pass fetched data: fandomData={fandomData} */ />
    </div>
  );
}

// Optional: Add metadata generation
// export async function generateMetadata({ params }: { params: { fandomSlug: string } }) {
//   const name = decodeURIComponent(params.fandomSlug).replace(/-/g,' ').replace(/\b\w/g,l=>l.toUpperCase());
//   return { title: `${name} | Crossmedia Fan Hub` };
// } 