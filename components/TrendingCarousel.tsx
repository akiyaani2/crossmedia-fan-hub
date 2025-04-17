'use client'; // Required for Swiper interaction

import React from 'react';
import Link from 'next/link'; // Import Link
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import required modules
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules'; // Add Autoplay

// Import icons for hover stats
import { Heart, MessageCircle } from 'lucide-react';

const TrendingCarousel = () => {
  // Placeholder Data - replace with actual data fetching later
  const trendingItems = [
    { id: 1, slug: 'coffee-shop-au-like-no-other', title: 'Coffee Shop AU Like No Other', type: 'Fanfic', image: 'https://via.placeholder.com/400x225/3A1078/FFFFFF?text=Fic+Cover', likes: 1256, comments: 345, author: 'UserA' },
    { id: 2, slug: 'webcomic-dragon-prince-returns', title: 'Webcomic: The Dragon Prince Returns', type: 'Comic', image: 'https://via.placeholder.com/400x225/2F58CD/FFFFFF?text=Comic+Panel', likes: 850, comments: 102, author: 'UserB' },
    { id: 3, slug: 'stunning-character-edit-amv', title: 'Stunning Character Edit [AMV]', type: 'Video', image: 'https://via.placeholder.com/400x225/9C27B0/FFFFFF?text=Video+Thumb', likes: 2134, comments: 511, author: 'UserC' },
    { id: 4, slug: 'multiverse-reading-list', title: 'Multiverse Crossover: Reading List', type: 'Bundle', image: 'https://via.placeholder.com/400x225/FF6E6E/FFFFFF?text=List+Cover', likes: 521, comments: 88, author: 'UserD' },
    { id: 5, slug: 'cyber-city-blues-novel', title: 'Original Web Novel: Cyber City Blues', type: 'Novel', image: 'https://via.placeholder.com/400x225/40F8FF/0A0A1A?text=Novel+Art', likes: 1589, comments: 250, author: 'UserE' },
    { id: 6, slug: 'new-podcast-episode-lore', title: 'Podcast: Fandom Deep Dive S2E4', type: 'Audio', image: 'https://via.placeholder.com/400x225/D1D5DB/0A0A1A?text=Audio+Wave', likes: 730, comments: 95, author: 'UserF' },
  ];

  return (
    // Use theme background - a gradient from midnight-ink to deep-purple
    <section className="py-16 md:py-20 overflow-hidden bg-gradient-to-b from-midnight-ink to-deep-purple/80">
      <h2 className="text-4xl font-headline font-bold mb-10 text-center text-white">
        Trending Now
      </h2>
      <Swiper
        modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]} // Add Autoplay
        spaceBetween={20}
        slidesPerView={1.5}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: true, // Keep autoplay running after user interaction
        }}
        pagination={{ 
          clickable: true,
          // Custom pagination bullets using theme colors
          renderBullet: function (index, className) {
            return '<span class="' + className + ' bg-medium-gray/50 hover:bg-neon-accent"></span>';
          },
        }} 
        keyboard={true}
        className="!pb-12 !px-4 md:!px-8" // Add horizontal padding
        breakpoints={{
          640: { slidesPerView: 2.5, spaceBetween: 25 },
          1024: { slidesPerView: 3.5, spaceBetween: 30 },
          1280: { slidesPerView: 4.5, spaceBetween: 30 },
        }}
      >
        {trendingItems.map(item => (
          <SwiperSlide key={item.id} className="group cursor-pointer h-full pb-2"> 
             <Link href={`/work/${item.slug}`} className="block h-full" legacyBehavior>
              {/* Use darker, themed card style with border */}
              <div className="relative bg-gray-800/60 dark:bg-gray-800/60 border border-medium-gray/30 rounded-lg shadow-lg overflow-hidden group-hover:shadow-xl group-hover:shadow-neon-accent/20 group-hover:border-neon-accent/50 transition-all duration-300 h-full flex flex-col">
                <div className="relative aspect-video w-full overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                  />
                  {/* Gradient overlay for text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-80 transition-opacity duration-300"></div> 
                  {/* Hover Stats Overlay - use theme colors */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity duration-300 
                                  flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex items-center gap-4 text-white drop-shadow-lg">
                      <span className="flex items-center text-sm font-medium">
                        <Heart className="w-4 h-4 mr-1 fill-soft-coral text-soft-coral" /> {item.likes > 1000 ? `${(item.likes/1000).toFixed(1)}k` : item.likes}
                      </span>
                      <span className="flex items-center text-sm font-medium">
                        <MessageCircle className="w-4 h-4 mr-1 fill-neon-accent/70 text-neon-accent" /> {item.comments}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="font-semibold mb-1 text-light-gray group-hover:text-neon-accent transition-colors line-clamp-2">{item.title}</h3>
                  {/* Add Author Link */} 
                  <p className="text-xs text-medium-gray mb-2">by <span className="hover:text-light-gray transition-colors">{item.author}</span></p>
                  <div className="mt-auto pt-1"> {/* Push tag to bottom */}
                    {/* Themed Tag */}
                    <span className="text-xs bg-cosmic-blue/80 text-white px-2.5 py-1 rounded-full font-medium">
                      {item.type}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TrendingCarousel; 