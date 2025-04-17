// app/page.tsx

'use client'; // Required for motion components AND hooks

import HeroSection from "@/components/HeroSection";
import TrendingCarousel from "@/components/TrendingCarousel";
import FeaturesGrid from "@/components/FeaturesGrid";
import FandomTags from "@/components/FandomTags";
import CommunityHighlights from "@/components/CommunityHighlights";
import { motion } from 'framer-motion';
import { useUser } from '@supabase/auth-helpers-react'; // Import useUser
import { useEffect } from 'react'; // Import useEffect

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
    <>
      {/* Hero section typically doesn't need scroll animation */}
      <HeroSection />

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
    </>
  );
}