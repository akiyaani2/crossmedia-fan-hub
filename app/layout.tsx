'use client'; // Required for AnimatePresence and usePathname

import type { Metadata } from "next";
// Remove Geist fonts as we're replacing them
// import { Geist, Geist_Mono } from "next/font/google";
// Import the specified fonts from Google Fonts
import { Inter, Roboto, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation'; // To get unique key for AnimatePresence

// Configure Inter (Body/Fallback Headline)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // CSS Variable
  display: "swap",
});

// Configure Roboto (Alternative Body)
const roboto = Roboto({
  weight: ["400"], // Only need regular for body
  subsets: ["latin"],
  variable: "--font-roboto", // CSS Variable
  display: "swap",
});

// Configure Space Grotesk (Headline)
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk", // CSS Variable
  weight: ["500", "700"], // Semi-bold, Bold
  display: "swap",
});

// Configure IBM Plex Mono (Metadata/Tags)
const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400"], // Only need regular
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono", // CSS Variable
  display: "swap",
});

export const metadata: Metadata = {
  title: "CrossMedia Fan Hub",
  description: "Your universe of stories. All in one place.",
};

// Animation variants for page transitions
const pageVariants = {
  initial: {
    opacity: 0,
    // y: -10 // Optional: slight slide down effect
  },
  in: {
    opacity: 1,
    // y: 0
  },
  out: {
    opacity: 0,
    // y: 10 // Optional: slight slide up effect
  }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate", // Or "easeInOut"
  duration: 0.4
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get current path for unique key

  return (
    <html lang="en">
      {/* Add all font variables to the body class */}
      <body
        className={`${
          inter.variable
        } ${
          roboto.variable
        } ${
          spaceGrotesk.variable
        } ${
          ibmPlexMono.variable
        // Set base dark background for the whole page
        } antialiased flex flex-col min-h-screen bg-midnight-ink dark:bg-midnight-ink`}
      >
        <Navbar />
        {/* Wrap main content with AnimatePresence and motion.main */}
        <AnimatePresence mode="wait"> {/* 'wait' ensures exit animation finishes first */}
          <motion.main
            key={pathname} // Unique key triggers animation on path change
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={pageTransition}
            className="flex-grow"
          >
            {children}
          </motion.main>
        </AnimatePresence>
        <Footer />
      </body>
    </html>
  );
}
