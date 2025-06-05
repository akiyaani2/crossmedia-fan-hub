'use client'; // Might be needed if we add complex client-side animations later

import React from 'react';
import Link from 'next/link'; // Import Link for footer strip
// Using icons that align with the vision
import { BookOpen, Film, Mic, Gamepad2, Sparkles, LayoutGrid } from 'lucide-react'; // Replace Clapperboard with Film, Flame with Sparkles, add LayoutGrid

const HeroSection = () => {
  return (
    // REMOVED bg-hero-gradient. The ConstellationPortal provides the background.
    // Keep relative positioning for internal absolute elements.
    <section className="relative text-center py-24 px-4 min-h-[80vh] md:min-h-[75vh] flex flex-col justify-center items-center 
                      overflow-hidden text-white">
      {/* Background Glow Pulse - Use theme colors */}
      <div className="absolute inset-0 flex justify-center items-center z-0">
        <div className="absolute w-72 h-72 md:w-[500px] md:h-[500px] bg-deep-purple/20 rounded-full animate-pulse-slow blur-3xl"></div>
        {/* Core element pulse - Brighter, central accent */}
        <div className="absolute w-60 h-60 md:w-[400px] md:h-[400px] bg-neon-accent/15 rounded-full animate-pulse-slow blur-3xl animation-delay-2000"></div>
      </div>
      {/* Icon Overlay Clusters - Use light-gray, update icons */}
      <div className="absolute inset-0 z-0 opacity-40 dark:opacity-50">
          {[ { Icon: BookOpen, top: '15%', left: '10%', delay: '500' }, // Fanfic
             { Icon: Film, top: '25%', right: '12%', delay: '1000' }, // Video Edits
             { Icon: Mic, bottom: '20%', left: '20%', delay: '1500' }, // Podfics
             { Icon: Gamepad2, bottom: '15%', right: '10%', delay: '2000' }, // Game Mods/Content
             // Add another one for visual balance
             { Icon: LayoutGrid, top: '50%', left: '50%', delay: '2500', transform: 'translate(-50%, -50%)' }, // General Grid/Layout Icon
          ].map(({ Icon, top, left, right, bottom, delay, transform }) => (
            <div
              key={delay} // Use delay as key for simplicity here
              className={`absolute p-2 bg-white/5 dark:bg-white/10 backdrop-blur-sm rounded-full shadow-lg 
                          animate-float animation-delay-${delay} 
                          hover:bg-white/15 dark:hover:bg-white/20 hover:scale-110 transition-all duration-300 cursor-pointer`}
              style={{ top, left, right, bottom, transform }} // Apply positioning dynamically
            >
              <Icon className="w-6 h-6 md:w-8 md:h-8 text-light-gray/70" />
            </div>
          ))}
      </div>
      {/* Main Copy Area - Use headline font explicitly if needed, adjust text colors */}
      <div className="relative z-10 text-center space-y-5 max-w-3xl">
        <h1 className="font-headline text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg" style={{ textShadow: '0px 2px 4px rgba(0,0,0,0.4)' }}>
          Your Multiverse of Fan Content Awaits
        </h1>
        <p className="font-sans text-lg md:text-xl text-light-gray max-w-xl mx-auto">
          Dive into fanfiction, art, videos, discussions & more — all in one hyper-personalized hub.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5 pt-5">
          {/* Buttons using theme colors */}
          <Link 
            href="/explore" // Link to the explore page
            className="bg-cosmic-blue hover:bg-opacity-90 text-white font-semibold px-8 py-3 rounded-md 
                       shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Explore Now
          </Link>
          <Link 
            href="/create" // Link to the create page
            className="bg-transparent border border-neon-accent/80 hover:border-neon-accent text-neon-accent px-8 py-3 rounded-md 
                       hover:bg-neon-accent/10 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Create & Share
          </Link>
        </div>
      </div>
      {/* Footer Strip - Use theme colors and update links/text */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
        {/* Use flex for horizontal layout, add gap, center items */}
        <div className="flex justify-center items-center gap-2 max-w-4xl mx-auto overflow-x-auto whitespace-nowrap no-scrollbar text-center">
          {[ { text: 'Trending Now', icon: <Sparkles className="w-3.5 h-3.5" />, href: '/explore?sort=trending' }, // Slightly larger icon
             { text: 'Latest Fanfics', icon: <BookOpen className="w-3.5 h-3.5" />, href: '/explore?type=fanfic' },
             { text: 'New Videos', icon: <Film className="w-3.5 h-3.5" />, href: '/explore?type=video' },
             { text: 'Fresh Podfics', icon: <Mic className="w-3.5 h-3.5" />, href: '/explore?type=podfic' },
             { text: 'Featured Creators', icon: <Gamepad2 className="w-3.5 h-3.5" />, href: '/explore?filter=creators' }, // Example filter
          ].map(item => (
            <Link
              key={item.text}
              href={item.href}
              // Updated styling: better padding, background, border, hover effect
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium 
                         bg-white/10 hover:bg-white/20 text-light-gray/80 hover:text-white 
                         border border-white/10 hover:border-white/20 
                         backdrop-blur-sm transition-all duration-200 ease-in-out 
                         transform hover:scale-105"
            >
              {/* Remove the extra span, let Link be the flex container */}
              {item.icon} 
              {item.text}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// Remember to add necessary keyframes/utilities to globals.css or tailwind config
// Example: 
/*
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .animation-delay-500 { animation-delay: 0.5s; }
  .animation-delay-1000 { animation-delay: 1s; }
  .animation-delay-1500 { animation-delay: 1.5s; }
  .animation-delay-2000 { animation-delay: 2s; }
  .animation-delay-2500 { animation-delay: 2.5s; }

  .animate-pulse-slow {
    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  .animate-float {
    animation: float 8s ease-in-out infinite;
  }

  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
}

@keyframes pulse {
  50% { opacity: .6; }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}
*/

export default HeroSection; 