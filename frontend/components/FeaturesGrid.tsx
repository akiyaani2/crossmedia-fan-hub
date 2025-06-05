'use client'; // Required for motion components

import React from 'react';
// Import specific icons from lucide-react
import { Library, Users, Combine, BrainCircuit, Search, Edit } from 'lucide-react';
import { motion } from 'framer-motion'; // Import motion

const FeaturesGrid = () => {
  const features = [
    {
      icon: Library,
      title: 'Unified Library',
      description: 'Organize fanfics, art, videos & more across all fandoms in one sleek interface.',
    },
    {
      icon: Search,
      title: 'Intelligent Discovery',
      description: 'Explore related content effortlessly with AI-powered recommendations and smart filters.',
    },
    {
      icon: Users,
      title: 'Vibrant Communities',
      description: 'Connect with fellow fans, join discussions, and follow your favorite creators.',
    },
    {
      icon: Edit,
      title: 'Seamless Creation Tools',
      description: 'Bring your ideas to life with intuitive tools for writing, uploading, and sharing.',
    },
  ];

  // Animation variants for the grid items
  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 md:py-24 bg-deep-purple/30 dark:bg-deep-purple/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-headline font-bold mb-16 text-center text-white">
          A Hub Built for Fans
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 text-center">
          {features.map((feature, index) => {
            const FeatureIcon = feature.icon;
            return (
              <motion.div 
                key={index} 
                variants={featureVariants} // Use variants for entry animation (can be tied to scroll later)
                // initial="hidden" // Can be uncommented when scroll animation is added
                // animate="visible"
                whileHover={{ scale: 1.05, y: -5 }} // Add scale and enhance lift on hover
                transition={{ type: "spring", stiffness: 300, damping: 15 }} // Spring physics for hover
                className="flex flex-col items-center group p-6 rounded-lg 
                                        border border-transparent hover:border-neon-accent/30 
                                        hover:bg-midnight-ink/20 transition-colors duration-200 ease-in-out"
              >
                <div className="mb-5 p-3 bg-cosmic-blue/20 rounded-full">
                   {/* Can optionally animate the icon container too */}
                   <motion.div 
                     className="p-2 bg-cosmic-blue rounded-full" 
                     whileHover={{ scale: 1.1 }}
                   >
                    <FeatureIcon className="w-8 h-8 text-white" />
                   </motion.div>
                </div>
                <h3 className="font-headline font-semibold mb-2 text-xl text-white group-hover:text-neon-accent transition-colors">
                  {feature.title}
                </h3>
                <p className="font-sans text-base text-light-gray/80">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid; 