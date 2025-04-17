import React from 'react';
import Link from 'next/link'; // Import Link
import { User, FileText, Trophy, Star } from 'lucide-react'; // Add Star icon

const CommunityHighlights = () => {
  // Placeholder Highlights Data
  const highlights = [
    {
      type: 'Top Creator',
      name: '@FandomScribe',
      detail: 'Most Kudos This Month!',
      icon: Star,
      link: '/user/FandomScribe' // Example link
    },
    {
      type: 'New Series Alert',
      name: 'The Crimson Bloom Ch. 1',
      detail: 'Highly anticipated sci-fi original.',
      icon: FileText,
      link: '/work/the-crimson-bloom-ch-1' // Example link
    },
    {
      type: 'Community Challenge',
      name: '#MultiverseMashup',
      detail: 'Create a crossover work - Ends Soon!',
      icon: Trophy,
      link: '/explore?filter=challenge-multiversemashup' // Example link
    },
  ];

  return (
    // Use a background that complements the previous section
    <section className="py-20 md:py-24 bg-midnight-ink dark:bg-midnight-ink">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-headline font-bold mb-16 text-center text-white">
          Community Pulse
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item, index) => {
            const HighlightIcon = item.icon;
            return (
              <Link href={item.link} key={index} className="block group" legacyBehavior>
                {/* Themed card with hover effect */}
                <div className="bg-gray-800/50 dark:bg-gray-800/50 rounded-lg shadow-lg p-6 
                                        border border-medium-gray/30 
                                        hover:border-cosmic-blue/50 hover:bg-gray-800/80 
                                        transition-all duration-300 ease-in-out transform hover:-translate-y-1 h-full">
                  {/* Themed type tag */}
                  <span className="inline-flex items-center text-xs bg-neon-accent/80 text-midnight-ink px-3 py-1 rounded-full font-semibold mb-4">
                    <HighlightIcon className="w-3.5 h-3.5 mr-1.5" />
                    {item.type}
                  </span>
                  <h3 className="font-semibold mb-2 text-lg text-white group-hover:text-neon-accent transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-light-gray/80">{item.detail}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CommunityHighlights; 