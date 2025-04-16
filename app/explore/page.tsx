'use client'; // Required for motion components in ContentCard

import React from 'react';
import Link from 'next/link'; // Need Link for cards
// Icons for stats and filters
import { Heart, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion'; // Import motion

// Placeholder components (can be moved to separate files later)
const FiltersSidebar = () => {
  // Example Filters
  const filterSections = [
    {
      title: 'Content Type',
      options: ['All', 'Fanfic', 'Art', 'Video', 'Podfic', 'Discussion'],
    },
    {
      title: 'Sort By',
      options: ['Trending', 'Newest', 'Most Popular', 'Relevant'],
    },
    {
      title: 'Fandoms',
      options: ['Search Fandoms...', 'Marvel', 'Star Wars', 'Harry Potter', /* Add more or make dynamic */],
      type: 'searchable',
    },
    {
      title: 'Tags',
      options: ['Search Tags...', 'Fluff', 'Angst', 'AU', /* Add more or make dynamic */],
      type: 'searchable',
    },
  ];

  return (
    <aside className="w-full md:w-64 lg:w-72 flex-shrink-0 p-4 space-y-6 bg-midnight-ink/50 dark:bg-gray-800/30 border border-medium-gray/30 rounded-lg h-fit sticky top-20">
      <h2 className="text-xl font-semibold text-neon-accent border-b border-medium-gray/50 pb-2">Filters</h2>
      {filterSections.map((section) => (
        <div key={section.title}>
          <h3 className="text-lg font-medium text-light-gray mb-2">{section.title}</h3>
          {section.type === 'searchable' ? (
            <input 
              type="text"
              placeholder={section.options[0]}
              className="w-full px-3 py-1.5 rounded-md border border-medium-gray bg-gray-700 text-light-gray placeholder-gray-400 focus:ring-1 focus:ring-neon-accent focus:border-neon-accent text-sm"
            />
            // Add dynamic results or button later
          ) : (
            <ul className="space-y-1">
              {section.options.map((option) => (
                <li key={option}>
                  <button className="text-left w-full text-sm text-light-gray/80 hover:text-neon-accent transition-colors">
                    {/* Add checkbox/radio later */} 
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </aside>
  );
};

// Refined Placeholder Card Component with Animation
const ContentCard = ({ item }: { item: any }) => {
  // Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    // Wrap the Link with motion.div
    <motion.div 
      variants={cardVariants}
      initial="hidden" 
      animate="visible"
      whileHover={{ y: -3, transition: { duration: 0.2 } }} // Subtle lift on hover
    >
      <Link href={item.link} className="block group h-full"> {/* Ensure link takes full height */}
        <div className="relative bg-gray-800/60 dark:bg-gray-800/60 border border-medium-gray/30 rounded-lg shadow-lg overflow-hidden 
                        group-hover:shadow-xl group-hover:shadow-neon-accent/20 group-hover:border-neon-accent/50 
                        transition-all duration-300 h-full flex flex-col">
          {/* Thumbnail Area */}
          <div className="relative aspect-video w-full overflow-hidden bg-gray-700"> 
            {item.image ? (
             <img 
               src={item.image} 
               alt={item.title} 
               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
             />
            ) : (
             <div className="w-full h-full flex items-center justify-center text-medium-gray">[Thumbnail]</div>
            )}
           {/* Optional: subtle overlay? */}
           {/* <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70"></div> */}
          </div>
          {/* Info Area */}
          <div className="p-3 md:p-4 flex-grow flex flex-col">
            <h3 className="font-semibold text-sm md:text-base mb-1 text-light-gray group-hover:text-neon-accent transition-colors line-clamp-2">{item.title}</h3>
            <p className="text-xs text-medium-gray mb-2">by <span className="hover:text-light-gray transition-colors">{item.author}</span></p>
            <div className="mt-auto pt-1 flex justify-between items-center"> 
               {/* Type Tag */}
               <span className="text-xs bg-cosmic-blue/80 text-white px-2 py-0.5 rounded-full font-medium">
                 {item.type}
               </span>
               {/* Basic Stats */}
               <div className="flex items-center gap-2 text-xs text-medium-gray">
                 <span className="flex items-center">
                   <Heart className="w-3 h-3 mr-0.5 fill-soft-coral/70 text-soft-coral" /> 
                   {item.likes > 1000 ? `${(item.likes/1000).toFixed(1)}k` : item.likes}
                 </span>
                 <span className="flex items-center">
                   <MessageCircle className="w-3 h-3 mr-0.5 fill-neon-accent/50 text-neon-accent" /> 
                   {item.comments}
                 </span>
               </div>
             </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ContentGrid = () => {
  // Placeholder Grid Items Data (more realistic)
  const items = Array.from({ length: 12 }).map((_, index) => ({
    id: index + 1,
    slug: `placeholder-work-${index + 1}`,
    title: `Placeholder Content Title ${index + 1} Which Might Be Quite Long`,
    type: ['Fanfic', 'Art', 'Video', 'Discussion', 'Podfic'][index % 5],
    // image: `https://via.placeholder.com/300x169/2F58CD/FFFFFF?text=Item+${index + 1}`,
    image: null, // Start with no image to show placeholder state
    likes: Math.floor(Math.random() * 2500),
    comments: Math.floor(Math.random() * 500),
    author: `User${String.fromCharCode(65 + (index % 10))}`,
    link: `/work/placeholder-work-${index + 1}`
  }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6">
      {items.map((item) => (
         <ContentCard key={item.id} item={item} />
      ))}
      {/* Add Infinite Scroll / Pagination later */} 
    </div>
  );
};

// Main Explore Page Component
export default function ExplorePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold font-headline text-cosmic-blue mb-6">Explore Content</h1>
      <p className="text-lg text-light-gray mb-8">Discover fan works, fandoms, and creators across the multiverse.</p>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */} 
        <FiltersSidebar />

        {/* Main Content Area */} 
        <main className="flex-grow">
          {/* Maybe add sorting dropdown / view options here */} 
          <div className="mb-4 flex justify-between items-center">
             <p className="text-sm text-medium-gray">Showing 1-12 of XXX results</p>
             {/* Add Sort Dropdown Component Here */}
             <select className="text-sm bg-gray-700/80 border border-medium-gray rounded-md px-2 py-1 text-light-gray focus:ring-neon-accent focus:border-neon-accent">
                <option>Sort by: Trending</option>
                <option>Sort by: Newest</option>
                <option>Sort by: Popular</option>
             </select>
          </div>
          <ContentGrid />
        </main>
      </div>
    </div>
  );
} 