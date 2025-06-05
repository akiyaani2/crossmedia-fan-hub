'use client'; // Required for motion components AND hooks

import HeroSection from "@/components/HeroSection";
import TrendingCarousel from "@/components/TrendingCarousel";
import FeaturesGrid from "@/components/FeaturesGrid";
import FandomTags from "@/components/FandomTags";
import CommunityHighlights from "@/components/CommunityHighlights";
import { motion } from 'framer-motion';
import { useUser } from '@supabase/auth-helpers-react'; // Import useUser
import { useEffect } from 'react'; // Import useEffect
import ConstellationPortal from "@/components/portal/ConstellationPortal"; // Import the portal

// Define animation variants for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      // Optional: add staggerChildren for animating items within the section
      // staggerChildren: 0.2 
    }
  }
};

export default function Home() {
  const user = useUser(); // Get user status

  // Log user status on component mount and when user changes
  useEffect(() => {
    console.log("Supabase User Status:", user ? user : "Not Logged In");
  }, [user]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Wrap HeroSection and Portal in a relative container */}
      <div className="relative w-full">
        {/* Portal goes first, positioned absolutely behind */}
        <ConstellationPortal />
        {/* HeroSection content sits on top */}
        <div className="relative z-10"> {/* Ensure HeroSection content is above portal */} 
          <HeroSection />
        </div>
      </div>

      {/* Wrap subsequent sections with motion.section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} // Trigger once, when 20% is visible
      >
        <TrendingCarousel />
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <FeaturesGrid />
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <FandomTags />
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <CommunityHighlights />
      </motion.section>
    </main>
  );
} 