import React from 'react';
import Link from 'next/link';
// Icons for tags
import { Tv, Film, Mic, Gamepad2, Music, BookOpen, Star, Hash } from 'lucide-react';

const FandomTags = () => {
  // Placeholder Tags - Fetch/Generate dynamically later
  // Using a generic Hash icon as fallback
  const tags = [
    { name: 'Anime', icon: Tv, slug: 'anime' },
    { name: 'Marvel', icon: Film, slug: 'mcu' }, // Use consistent slug
    { name: 'Taylor Swift', icon: Music, slug: 'taylor-swift' },
    { name: 'Baldur\'s Gate', icon: Gamepad2, slug: 'baldurs-gate-3' }, // Use consistent slug
    { name: 'Star Wars', icon: Star, slug: 'star-wars' },
    { name: 'Harry Potter', icon: BookOpen, slug: 'harry-potter' },
    { name: 'Podfics', icon: Mic, slug: 'podfics' }, // Content type tag example
    { name: 'Gaming', icon: Gamepad2, slug: 'gaming' }, // Broader category
  ];

  return (
    // Use a background that transitions from the previous section if desired, or a solid color
    <section className="py-16 md:py-20 bg-deep-purple/60 dark:bg-deep-purple/60">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-headline font-bold mb-10 text-center text-white">
          Explore Popular Tags
        </h2>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {tags.map(tag => {
            const TagIcon = tag.icon || Hash; // Fallback icon
            return (
              <Link
                // Link to explore page with filter applied
                href={`/explore?tag=${tag.slug}`} 
                key={tag.slug} 
                // Use theme colors for tags, border for hover effect
                className="inline-flex items-center font-mono bg-cosmic-blue/70 hover:bg-cosmic-blue text-light-gray hover:text-white 
                           text-sm md:text-base font-medium px-4 py-1.5 md:px-5 md:py-2 rounded-full 
                           border border-transparent hover:border-neon-accent/50 
                           cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 ease-in-out transform hover:-translate-y-0.5"
              >
                <TagIcon className="w-4 h-4 mr-1.5 flex-shrink-0" />
                {tag.name}
              </Link>
            );
          })}
        </div>
         {/* Optional: Add a link to view all tags/fandoms */}
         <div className="text-center mt-10">
           <Link href="/explore?filter=tags" className="text-neon-accent hover:underline font-medium">
             See all tags
           </Link>
         </div>
      </div>
    </section>
  );
};

export default FandomTags; 